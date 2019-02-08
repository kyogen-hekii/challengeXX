var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

/* GET  */
let start_time;
let stop_time;
let radio_op;
router.get('/', function(req, res, next) {
  // ここで行えるのは変数を渡すだけ。値を書き換えたりはしない。
  res.render('index', { title: 'Express',
                        start_time: start_time, 
                        stop_time: stop_time,
                        radio_op: radio_op });
});
/* POST  */
router.post('/start', (req, res, next) => {
  // ここで行っているのはあくまでもローカル変数にセットしているだけ
  stop_time = "";
  start_time = Date.now();
  radio_op = req.body.options;
  res.redirect('/');
});
router.post('/stop', (req, res, next) => {
  stop_time = Date.now();
  radio_op = req.body.options;
  res.redirect('/');
});
router.post('/save', (req, res, next) => {
  //基本的にname属性しかとれない?
  radio_op = req.body.options;//co(valueが返る)
  
  let obj = {
    radio_op: req.body.options,
    start_time: req.body.txt_start,
    stop_time: req.body.txt_stop,
  }
  const tmpname = 'result.json';
  const newpath = path.join(__dirname, tmpname);
  fs.writeFile(newpath, JSON.stringify(obj, undefined, 2), 'utf8', (err) => {
    if(err){
      return console.log(err);
    }
  });
  //console.log(JSON.stringify(obj, undefined, 2));
  res.redirect('/')
});
router.post('/reset', (req, res, next) => {
  start_time = "";
  stop_time = "";
  res.redirect('/')
});

module.exports = router;
