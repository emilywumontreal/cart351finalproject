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

let queryArray = [

"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Martha', 'Elephants','1998-03-04','Montreal','Description for the arts')",
"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Sarah', 'Hippos','2002-06-12','Montreal','Description for the arts')",
"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Harold', 'Untitled', '2012-10-21','New York','Description for the arts')",
"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Stephen', 'Scotland','1999-07-18','Edinborough','Description for the arts')",
"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Martha', 'Tigers','2017-08-21','Paris','Description for the arts')",
"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Sarah', 'WIndow','2005-06-13','Toronto','Description for the arts')",
"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Sarah', 'Untitled', '2003-03-19','Halifax','Description for the arts')",
"INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript) VALUES ('Stephen', 'Zoo','2000-05-06','London','Description for the arts')"
];
for(let i =0; i<queryArray.length; i++)
{
  db.run(queryArray[i], (err) =>{

  if(err)
  {
    return console.error(err.message);
  }
  else {
    console.log("inserted entry"+i);
  }
});
}


//close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
