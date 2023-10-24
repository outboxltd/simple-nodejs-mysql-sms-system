// Create the database and table
const mysql = require('mysql');

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: ''
});

db.connect((err) => {
if (err) throw err;
console.log('Connected to MySQL');
db.query('CREATE DATABASE IF NOT EXISTS sms_system', (err, result) => {
if (err) throw err;
console.log('Database created');
db.changeUser({database: 'sms_system'}, err => {
if (err) throw err;
const table = `CREATE TABLE IF NOT EXISTS messages(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255),
phone VARCHAR(255),
unique_link VARCHAR(255),
hits INT
)`;
db.query(table, err, result) => {
if (err) throw err;
console.log('Table created');
});
});
});
});