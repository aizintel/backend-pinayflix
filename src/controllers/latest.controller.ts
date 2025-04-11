import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface PageData {
  data: {
  title: string;
  img: string;
  link: string;
  video: string;
  }[],
  totalPages: string
}


export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;

    if (!query) {
      res.status(400).json({ error: 'Missing required query parameter: q' });
      return;
    }

    const searchUrl = `https://pinayflix.me/page/${page}/?s=${query}/?filter=latest`;
    console.log("Url",searchUrl);

    const axiosResponse = await axios.get(searchUrl);
    const $ = cheerio.load(axiosResponse.data);

    const totalPages = $('#main > div.pagination a').last().attr('href')?.match(/page\/(\d+)\//)?.[1] ?? '0';

    const pageData: PageData = {
      data: [],
      totalPages
    };

    const promises: Promise<void>[] = [];

    $('#primary a').each((_, element) => {
      const val = $(element).attr('href');
      if (val && val.startsWith('https')) {
        promises.push(
          axios.get(val).then((scr) => {
            const links = cheerio.load(scr.data);
            const title = links('title').text().trim() || '';
            const img = links('meta[property="og:image"]').attr('content') || '';
            const embedURL = links('meta[itemprop="contentURL"]').attr('content') || '';

            if ((img && embedURL) || img || embedURL) {
              pageData.data.push({ title, img, link: val, video: embedURL });
            }
          }).catch((error) => {
            console.error('Error fetching page:', val, error);
          })
        );
      }
    });

    await Promise.all(promises);
    res.json(pageData);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred while searching' });
  }
};


export const pages = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const url = `https://pinayflix.me/page/${page}/?filter=latest`;

    const axiosResponse = await axios.get(url);
    const $ = cheerio.load(axiosResponse.data);
  
    const totalPages = $('#main > div.pagination a').last().attr('href')?.match(/page\/(\d+)\//)?.[1] ?? '0';

    const pageData: PageData = {
      data: [],
      totalPages
    };

    const promises: Promise<void>[] = [];

    $('#primary a').each((_, element) => {
      const val = $(element).attr('href');

      if (val && val.startsWith('http')) {
        promises.push(
          axios.get<string>(val).then((src) => {
            const $page = cheerio.load(src.data);
            const title = $page('title').text().trim();
            const img = $page('meta[property="og:image"]').attr('content') || '';
            const video = $page('meta[itemprop="contentURL"]').attr('content') || '';

            if (img) {
              pageData.data.push({ title, img, link: val, video });
            }
          }).catch(err => {
            console.error(`Failed to fetch page ${val}:`, err.message);
          })
        );
      }
    });

    await Promise.all(promises);
    res.json(pageData);
  } catch (error) {
    console.error('Pages error:', error);
    res.status(500).json({ error: 'An error occurred while loading pages' });
  }
};
