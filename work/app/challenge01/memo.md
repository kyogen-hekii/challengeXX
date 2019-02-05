19/02/05
### (1) 環境構築
docker-compose start
docker exec -it cnode /bin/sh
cd ./challenge01
  npm init -y
express -f --view=pug
npm install

### (2) git周り
git init
touch .gitignore
touch README.md
git add README.md
git add Dockerfile
git add docker-compose.yml
git add work\app\challenge01
git status
git diff --cached
git commit -m "first commit"
git remote add origin https://github.com/kyogen-hekii/challengeXX.git
git push -u origin master

### (3)ファイル修正
```js
//app.js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

```pug
//- index.pug
h1= title
h2= "サーバを停止すると書き込み内容も削除されます."
form(method='post', action='/')
    label
        input(type="textbox", name="txt")
        input(type="submit", value="書き込む")
    each v in data
        p #{v}
    else
        p There is no coment
```

```js
// index.js
let chat_data = [];
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express', data: chat_data});
});
router.post('/', (req, res, next) => {
    chat_data.push(res.body.txt);
    res.setHeader('Content-Type', 'text/plain');
    res.redirect('/');
});
```

### (4) 実行
docker-compose up -d
docker exec -it cnode /bin/sh
npm start

### (5) commit/push
git add work\app\challenge01
git diff --cached
git commit -m "easy bulletin board"
git push

### 参考
[node.js 怒濤の50サンプル!! – socket.io編](http://testcording.com/?p=1223)
018: 簡易掲示板を作ってみよう
