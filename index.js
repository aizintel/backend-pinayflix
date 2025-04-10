const express = require('express');
const path = require('path');
const app = express();

const { 
  most_popular_pages, 
  most_popular_search,
  most_view_pages, 
  most_view_search,
  longest_view_pages,
  longest_view_search,
  random_pages, 
  random_search,
  home_pages,
  home_search,
  latest_pages,
  latest_search
} = require('./utils/build');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', async (req, res) => {
  try {
    const data = await latest_pages(1);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
