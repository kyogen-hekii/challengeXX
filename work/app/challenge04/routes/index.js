var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

/* GET */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

/* POST */
router.post('/convert', (req, res, next) => {
  const inputfile = 'todo.md';
  const outputfile = 'todo.json';
  const p = path.join(__dirname, '../'+ inputfile);//__dirnameは/routes
  
  fs.readFile(p, 'utf8', (err, data) => {
    //(1) 1行目を|区切りで配列に格納
    const lines = data.toString().split('\r\n');
    const headerArr = lines[0]
      .replace(/^ *\| */g, "")
      .replace(/ *\| *$/g, "")
      .split('|')
      .map(e => e.trim());
    //(2) 3行目以降、|区切りで配列をもとにdictionaryに格納
    let dic = {};
    const bodyArr = lines.filter((e, i) => { return 2 <= i && e !== "";})
                          .map((e) => {
                            dic = {};
                            e.replace(/^ *\| */g, "")
                              .replace(/ *\| *$/g, "")
                              .split('|')
                              .map(e => e.trim())
                              .map((e2,i2) => {
                                  dic[headerArr[i2]] = e2;
                              });
                            return dic;
                          });
    const j = JSON.stringify(bodyArr);
    const outpath = path.join(__dirname, '../'+outputfile);
    fs.writeFile(outpath, j, 'utf8', (err) => {
      if(err){
        return console.log(err);
      }
    });
    res.redirect('/');
  });
});
module.exports = router;