const sqlite3 = require('sqlite3').verbose();
//let querysql = `SELECT comment,fromUserId as commenterName,toUserId as uploaderName,commentDatatime FROM comment order by commentId desc`;
let insertsql = `INSERT INTO comment(comment,fromUserId,toUserId) VALUES(?)`;

// open the database
let db = new sqlite3.Database('./db/puppet.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the puppet database.');
});


db.run(insertsql, ['C'], function(err) {
   if (err) {
     return console.log(err.message);
   }
   // get the last insert id
   console.log(`A row has been inserted with rowid ${this.Id}`);
 });

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
