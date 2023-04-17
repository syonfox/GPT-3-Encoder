const path = require('path');
require('dotenv').config();

let db = require('./db')();
let utils = require('./utils');
db.query("SELECT 1").then(console.log).catch(console.error);
utils.pgExecute(db, "SELECT 1", "It works").then(console.log).catch(console.error);