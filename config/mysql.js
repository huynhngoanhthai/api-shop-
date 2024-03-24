const { createPool } = require("mysql");
const { DATABASE, HOST, PASSWORD, USERNAME } = require("./constant");
console.table( {DATABASE, HOST, PASSWORD, USERNAME});
// console.log(process.env);
const pool = createPool({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
});

module.exports = pool;
