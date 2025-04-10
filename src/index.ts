
import express from 'express';
import latestRouter from './routes/latest.route.js';
import longestViewRouter from './routes/longestView.route.js';
import mostPopularRouter from './routes/mostPopular.route.js';
import mostViewRouter from './routes/mostView.route.js';
import randomRouter from './routes/random.route.js';
import homeRouter from './routes/home.route.js';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/', homeRouter);
app.use('/latest', latestRouter);
app.use('/longest-view', longestViewRouter);
app.use('/most-popular', mostPopularRouter);
app.use('/most-view', mostViewRouter);
app.use('/random', randomRouter);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
