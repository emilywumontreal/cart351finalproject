/* create the db and tables, then close*/

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("../db/puppet.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if(err)
  {
    return console.error(err.message);
  }
  else {
    console.log("success");
  }

})

db.run('CREATE TABLE artCollection (pieceID INTEGER PRIMARY KEY NOT NULL, artist TEXT, title TEXT,geoLoc TEXT, creationDate TEXT,descript)', (err) =>{
  if(err)
  {
    return console.error(err.message);
  }
  else {
    console.log("created table artCollection");
  }

});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
