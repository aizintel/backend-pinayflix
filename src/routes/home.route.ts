const express = require('express');  // Use require for CommonJS
const { pages, search } = require('../controllers/home.controller');

const router = express.Router();

router.get('/pages', pages);  // Endpoint to get page data
router.get('/search', search); // Endpoint to search

module.exports = router;  // Export using CommonJS syntax
