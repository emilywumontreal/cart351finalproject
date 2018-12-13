/* create the db and tables, then close*/

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("../db/graffitti.db", sqlite3.OPEN_READWRITE, (err) => {
  if(err)
  {
    return console.error(err.message);
  }
  else {
    console.log("success");
  }

})


let sql = `SELECT * FROM artCollection`;

//using the all
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log("COMPLETE ROW");
    console.log(row);
    console.log("ACCESS FIELDS");
    console.log(row.artist+","+row.title);
    /*...*/
  });
});


//close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
