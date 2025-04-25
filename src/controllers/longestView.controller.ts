import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface PageData {
  data: {
  title: string;
  img: string;
  link: string;
  video: string;
  date: string;
  author: string;
  }[],
  totalPages: string
}


export const pages = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.body.page ? parseInt(req.body.page as string, 10) : 1;
    const url = `https://pinayflix.me/page/${page}/?filter=longest`;
    console.log(url)

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
            const date = $page('#video-date').text().trim() || '';
            const author = $page('#video-author').text().trim() || ''; 
            

            if (img) {
              pageData.data.push({ title, img, link: val, video, date, author });
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
