const path = require('path');
const {Pool} = require('pg');
const fs = require('fs');

const config = {
  connectionString: process.env.PG_URI,
  // Beware! The ssl object is overwritten when parsing the connectionString
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: fs.readFileSync(path.join(__dirname, process.env.PG_SSL)).toString(),
  // },
}
let db;

module.exports = ()=> {
  if(!db) db = new Pool(config);

  return db
}