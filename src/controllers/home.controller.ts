import { Request, Response } from 'express';
import cheerio from 'cheerio';

export const search = (req: Request, res: Response): void => {

}

export const pages = (req: Request, res: Response): void => {
  try {

    const url = `https://pinayflix.me/page/${page}`;
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const data = [];

    const promises = [];

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
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}