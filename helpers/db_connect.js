var mysql = require('mysql');
const util = require( 'util' );
var config = require('../config/dev.jsonConfig.json').db;

 
function makeDb(  ) {
  const connection = mysql.createConnection( {
        host: config.dbhost,
        user: config.dbuser,
        password: config.dbpassword,
        database: config.dbname
    } );
  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

function QueryDB(sql){ 
    const db = makeDb();
    let ans = db.query(sql);
    console.log(ans,"did we get it")
    db.close();
    return ans; 
}


module.exports = {QueryDB};