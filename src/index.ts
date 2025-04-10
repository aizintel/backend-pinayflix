const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const homeRoutes = require('./routes/home.route');

app.use('/api/home', homeRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

