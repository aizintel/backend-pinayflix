
import express from 'express';
import homeRoutes from './routes/home.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/home', homeRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
