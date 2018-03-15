# sqlite
Node.js + Express  

## Description
sqliteへアクセスし, sqliteのデータからAPIを作成する.  
  
http://localhost:3000/api/db/tables  
DBにあるテーブルを表示  

http://localhost:3000/api/db/list  
DBに保存されているデータ(名前と電話番号)を表示  
  
DELETE  
```
curl -sS -X DELETE 'http://localhost:3000/api/db/delete?SEQ=番号'
```
番号には削除したいキーの番号を入力してください.  
  
作成中...
