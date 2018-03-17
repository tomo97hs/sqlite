var sqlite3 = require('sqlite3').verbose();
var url = require('url');
var express = require('express');
var router = express.Router();

var dbFile = './routes/api/db/mydb.sqlite3';


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('/api/db/index');
  res.status(200);
  res.send('/api/db/index');
});

router.get('/tables', function(req, res, next) {
  console.log('api/db/tables');
  try {
    var db = new sqlite3.Database(dbFile);
    db.serialize(function() {
      db.all("SELECT name FROM sqlite_master WHERE type = 'table'", function(err, rows) {
        if (err) {
          var er = Error('Sql Error');
          er.status = 404;
          next(er);
        } else {
          db.close();
          res.status(200);
          res.send(rows);
        }
      });
    });
  } 
  catch (e) {
    var er = Error('catch Error');
    er.status = 404;
    next(er);
  }
});

/* count */
router.get('/count', function(req, res, next) {
  console.log('api/db/count');
  var db = new sqlite3.Database(dbFile);
  db.serialize(function() {
    db.all("SELECT COUNT(*) AS COUNT FROM tblAddressBook", function(err, rows) {
      if (err) {
        var er = Error('Sql Error');
        er.status = 404;
        next(er);
      } else {
        db.close();
        res.status(200);
        res.send(rows);
      }
    });
  });
});


/* list */
router.get('/list', function(req, res, next) {
  console.log('api/db/list');
  var db = new sqlite3.Database(dbFile);
  db.serialize(function() {
    db.all("SELECT * FROM tblAddressBook", function(err, rows) {
      if (err) {
        var er = Error('Sql Error');
        er.status = 404;
        next(er);
      } else {
        db.close();
        res.status(200);
        res.send(rows);
      }
    });
  });
});

/* insert */
router.post('/insert', function(req, res, next) {
  console.log('api/db/insert');
  // var urlParse = url.parse(req.url, true);
  // console.log(urlParse);
  // var name = urlParse.query.Name;
  // var phoneNumber = urlParse.query.PhoneNumber;
  console.log(req.body);
  var name = req.body.Name;
  var phoneNumber = req.body.PhoneNumber;
  var sql = "INSERT INTO tblAddressBook ('Name','PhoneNumber') VALUES ('" + name + "','" + phoneNumber + "')";
  var db = new sqlite3.Database(dbFile);

  db.serialize(function() {
    db.all(sql, function(err, rows) {
      if (err) {
        res.status(404);
        res.send('Insert Error');
      } else {

        db.close();
        res.status(200);
        res.json('OK');
      }
    });
  });
});

/* delete */
router.delete('/delete', function(req, res, next) {
  console.log('api/db/delete');
  var seq = req.body.SEQ;
  console.log(seq);
  var sql = "DELETE FROM tblAddressBook WHERE SEQ=" + seq;
  var db = new sqlite3.Database(dbFile);
  
  db.serialize(function() {
    db.all(sql, function(err, rows) {
      if (err) {
        res.status(404);
        res.send('Delete Error');
      } else {
        db.close();
        res.status(200);
        res.json('OK');
      }
    });
  });
})

/* select */
router.get('/select', function(req, res, next) {
  console.log('api/db/select');
  var urlParse = url.parse(req.url, true);
  var seq = urlParse.query.SEQ;
  var name = urlParse.query.Name;
  var phoneNumber = urlParse.query.PhoneNumber;
  var sql = "";
  if(!(seq === undefined)) {
    sql = "SELECT * FROM tblAddressBook WHERE SEQ=" + seq;        
  } else if(!(name === undefined)){
    sql = "SELECT * FROM tblAddressBook WHERE Name LIKE '%" + name + "%'";
  } else if(!(phoneNumber === undefined)){
    sql = "SELECT * FROM tblAddressBook WHERE PhoneNumber LIKE '%" + phoneNumber + "%'";
  } else {
    res.status(404);
    res.send('Query Error');
    return;
  }
  
  var db = new sqlite3.Database(dbFile);

  db.serialize(function() {
    db.all(sql, function(err, rows) {
      if (err) {
        res.status(404);
        res.send('Select Error');
      } else {
        db.close();
        res.status(200);
        res.send(rows);
      }
    });
  });
});

module.exports = router;
