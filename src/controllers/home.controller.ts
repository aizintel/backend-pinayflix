import { Request, Response } from 'express';
import cheerio from 'cheerio';
import axios from 'axios';

interface PageData {
  title: string;
  img: string;
  link: string;
  video: string;
}

export const search = async (req?: Request, res?: Response): Promise<void> => {
  try {
    const query = req.query.q as string; 
    const searchUrl = `https://example.com/search?q=${query}`;
    const axiosResponse = await axios.get(searchUrl);
    const $ = cheerio.load(axiosResponse.data);

    const results: PageData[] = [];
    $('.search-result').each((i, element) => {
      const title = $(element).find('.title').text();
      const img = $(element).find('img').attr('src') || '';
      const link = $(element).find('a').attr('href') || '';
      const video = $(element).find('.video-url').attr('href') || '';

      results.push({ title, img, link, video });
    });

    res.json(results); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while searching' });
  }
}
export const pages = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const url = `https://pinayflix.me/page/${page}`;

    const axiosResponse = await axios.get(url);
    const $ = cheerio.load(axiosResponse.data);

    const data: PageData[] = [];
    const promises: Promise<void>[] = [];

    $('#primary').find('a').each((i, element) => {
      const val = $(element).attr('href');

      if (val && val.startsWith('http')) {
        promises.push(
          axios.get(val).then((scr) => {
            const links = cheerio.load(scr.data);

            const title = links('title').text();
            const img = links('meta[property="og:image"]').attr('content');
            const embedURL = links('meta[itemprop="contentURL"]').attr('content');

            if (img !== undefined) { 
              data.push({ title, img, link: val, video: embedURL });
            }
          })
        );
      }
    });

    await Promise.all(promises);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
  }
}
