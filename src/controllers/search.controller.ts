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


export const latest = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;
  

    if (!query) {
      res.status(400).json({ error: 'Missing required query parameter: q' });
      return;
    }

    const searchUrl = `https://pinayflix.me/?s=${query}&filter=latest`;
    console.log(searchUrl);


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


export const random = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;
    
    if (!query) {
      res.status(400).json({ error: 'Missing required query parameter: q' });
      return;
    }

    const searchUrl = `https://pinayflix.me/?s=${query}&filter=random`;
    console.log(searchUrl);

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
