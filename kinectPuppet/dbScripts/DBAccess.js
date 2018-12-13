
const sqlite3 = require('sqlite3').verbose();
//just Connected
exports.establishConnection = function(){
let db = new sqlite3.Database("./db/puppet.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err)
    {
      return console.error(err.message);
    }
    else {
      console.log("success");
    }

  })
  return db;
}

// insert
exports.putData = function(db,data) {
        return new Promise(( resolve, reject ) => {
          //console.log("i am in DBAccess insert data function now");
            let sqlInsert = `INSERT INTO user (userId, password, userBestCredit) VALUES ('${data.userId}','${data.password}','${data.userBestCredit}')`;
            db.run(sqlInsert, (err) =>{
              if(err) return reject( err );
              resolve("inserted entry");
            });
      });
  };

  exports.fetchData = function(db,theQuery) {
          return new Promise(( resolve, reject ) => {
              //using the all
              let theQuery = `SELECT userBestCredit,userId FROM user order by userBestCredit DESC`;
              db.all(theQuery, [], (err, resultSet) => {
                if(err) return reject( err );
                //return the resultSet
                  resolve( resultSet);
              });
            });
          };
