import { Request, Response } from 'express';
import express from 'express';

const app = express();
const PORT = 3000;

// This works fine, no need to explicitly type `req: Request` unless you need custom types
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
