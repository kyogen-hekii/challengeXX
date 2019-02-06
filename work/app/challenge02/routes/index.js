var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

/* GET */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* POST */
router.post('/', (req, res, next) =>{
  fs.readFile(req.body.txt, 'utf8', (err, data) =>{
    if(err){
      return console.log(err);
    }
    // (1) 置換処理結果
    const result = data.replace(/`(.*)`/g, '<span class=""cloze"" onclick=""cloze(this.id);"">$1</span>');
    // (2) 作成するファイル名
    const repname = "rep_" + path.basename(req.body.txt);  
    // (3) 作成するファイルパス
    const newpath = path.join(path.dirname(req.body.txt), repname);
    // (4) (1)を(3)に出力
    fs.writeFile(newpath, result, 'utf8', (err) => {
      if(err){
        return console.log(err);
      }
    });   
  });
  res.redirect('/');
});

module.exports = router;
