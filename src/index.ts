
import express from 'express';
import homeRouter from './routes/home.route.js';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/', homeRouter);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
