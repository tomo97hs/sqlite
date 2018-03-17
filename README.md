# sqlite
Node.js + Express  

## Description
sqliteへアクセスし, sqliteのデータからAPIを作成する.  
  
Nodeプロジェクト実行  
```
npm start
```
  
DBにあるテーブルを表示  
http://localhost:3000/api/db/tables    
  
DBに保存されているデータ(名前と電話番号)を表示  
http://localhost:3000/api/db/list  
  
DBに保存されているデータを検索  
- SEQの*番号*を指定して検索  
http://localhost:3000/api/db/select?SEQ=番号  
- *名前*を指定して検索  
http://localhost:3000/api/db/select?Name=名前  
- *電話番号*を指定して検索  
http://localhost:3000/api/db/select?PhoneNumber=電話番号  
  
DBに保存されているデータ件数を表示
http://localhost:3000/api/db/count  
  
  
INSERT  
```
curl -sS -X POST 'http://localhost:3000/api/db/insert' -d ''
```
  
DELETE  
```
curl -sS -X DELETE 'http://localhost:3000/api/db/delete' -d 'SEQ=番号'
```
*番号*には削除したいキーの番号を入力してください.  
  

作成中...
