const sqlite3 = require('sqlite3').verbose();
let sql = `SELECT userBestCredit,userId FROM user order by userBestCredit DESC`;
//let insertsql = `INSERT INTO comment(comment,fromUserId,toUserId) VALUES(?)`;

//open the database
let db = new sqlite3.Database('puppet.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the puppet database.');

});


db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.userId +'\t' + row.userBestCredit);
  });
});
//
// let readRecordsFromMediaTable = function(callback){
//
//   //  var db = new sqlite3.Database('puppet.db', sqlite3.OPEN_READONLY);
//
//     var allRecords = [];
//
//     db.serialize(function() {
//
//         db.each(querysql, function(err, row) {
//
//           //  myLib.generateLog(levelDebug, util.inspect(row));
//             allRecords.push(row);
//             console.log("allRows is getting");
//
//         });
//         console.log("allRows is getting");
//         callback(allRecords);
//         db.close();
//
//     });
//
// }


//
// db.get(querysql, [], (err, row) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   return row
//     ? console.log(row.userBestCredit + "\t" + row.userId)
//     : console.log(`No playlist found with the id ${playlistId}`);
//
// });


// db.serialize(() => {
//   db.each(querysql, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.userBestCredit + "\t" + row.userId);
//   });
// });


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
