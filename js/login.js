const sqlite3 = require('sqlite3').verbose();
let querysql = `SELECT userId,userPassword datetime FROM user`;
let insertsql = `INSERT INTO user(userId,password,email) VALUES(?)`;
let loginFlag = '';
// open the database
let db = new sqlite3.Database('./db/puppet.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the puppet database.');
});

///????????
 db.serialize(() => {
   db.each(querysql, (err, row) => {
     if (err) {
       console.error(err.message);
     }
     console.log(row.userId + "\t" + row.userPassword);
     if (row.userPassword == $(userPassword)) {
       loginFlag = row.userId;
     } else {
       console.log('password is uncorrect! try it again');
     }
     //??????
     if (row.count == 0) {
       console.log('do you want register as a new user?');
       db.run(insertsql, ['C'], function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.Id}`);
        });
     }
   });
 });

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
