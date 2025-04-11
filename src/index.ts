import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import homeRoutes from './routes/home.route';
import latestRoutes from './routes/latest.route';
import longestRoutes from './routes/longestView.route';
import mostPopularRoutes from './routes/mostPopular.route';
import mostViewRoutes from './routes/mostView.route';
import randomRoutes from './routes/random.route';
import searchRoutes from './routes/search.route';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/home', homeRoutes);
app.use('/api/latest', latestRoutes);
app.use('/api/longest', longestRoutes);
app.use('/api/most-popular', mostPopularRoutes);
app.use('/api/most-view', mostViewRoutes);
app.use('/api/random', randomRoutes);
app.use('/api/search', searchRoutes);


app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
