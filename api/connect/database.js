const mysql = require ('mysql')
const con = mysql.createConnection({
    user:'root',
    host:'localhost',
    database:'industriaalimenticia'
})

module.exports = con;