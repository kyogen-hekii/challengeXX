# 004. markdown to json
## 概要
convertボタンを押下すると以下のように置換する
``` before
|  challenge  |  scheduled  | finish |
| ---- | ---- | ---- |
|  簡易掲示板  |  02/03  |  x  |
|  置換ツール  |  02/04  |  x  |
|  md to json  |  02/10  | |
```
``` after
{
    {challenge: "簡易掲示板", scheduled: "02/03", finish: "x" },
    {challenge: "置換ツール", scheduled: "02/04", finish: "x" },
    {challenge: "md to json", scheduled: "02/10", finish: "" }
}
```
* 1行目を|区切りで配列に格納
* 2行目は無視
* 3行目以降、|区切りで配列をもとにdictionaryに格納

## 詳細設計
convertボタンを押下時に以下の処理によってファイルを作成する。
- postパス /convert
- inputfile:  ./todo.md
- outputfile: ./todo.json

1. `fs.readfile()`でファイルを読み込む
    `const lines = data.tostring().split('/r/n')`
2. 1行目を|区切りで配列に格納
    `lines[0].replace(/最初と最後の区切り文字を削除/g)
    .split('|').map(e => e.trim())`
3. 3行目以降、|区切りで配列をもとにdictionaryに格納
    ```js
    lines.filter((e, i) => { return 2 <= i })
         以下、各行の処理
         .map((e) => {
             e.replace(/最初と最後の区切り文字を削除/g)
              .split('|').map(e => e.trim())
              *** key:headerの0,1,2番目 value:bodyの0,1,2番目
              .map((e2, i2) => dic[header[i2]] = e2)
              *** 作成したdicをmap内で返却
              return dic;
         })
    ```
4. `Json.stringfy()`でdictionaryをjsonに変換
5. `fs.writefile()`でファイルを出力する。

## 課題
* readlineを使う例が見つかるが使い方がよくわからなかった。
expressを使用しているときにapp.on('イベント'~)はどのように書けばいいのか。
routing前提なら、イベントハンドラは使わないのか。
* タグ付きテンプレートリテラルが使用できたのではないか。
* これならGUIは必要なかった。
せめて入出力をテキストボックスで表示するべき。