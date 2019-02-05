var express = require('express');
var router = express.Router();

// 投稿データ格納
let chat_data = [];

// GET
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: chat_data });
});
// POST
router.post('/', (req, res, next) => {
  chat_data.push(req.body.txt);
  res.setHeader('Content-Type', 'text/plain');
  res.redirect('/');
});
module.exports = router;
