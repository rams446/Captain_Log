const express = require('express');
const router = express.Router();




//=======INDUCES========
// New // renders a form to create a new fruit
router.get('/new', (req, res) => {
    res.render('New');
  });