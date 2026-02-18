const express = 
    require('express');
const { getHits } = require('./scr/hits.js');
const app = express();
app.get('/hits/:page', (req,res) => {
    res.contentType('text/plain').send (getHits());
});
