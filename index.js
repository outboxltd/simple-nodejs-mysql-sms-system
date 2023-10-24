const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const app = express();
const port = 3000;
// Database setup
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'sms_system' });
db.connect((err) => { if (err) throw err; console.log('Connected to the database'); });
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Routes
app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html'); });
app.post('/sendSMS', (req, res) => {
// Your SMS sending logic here
// For example, using axios to mimic the cURL request
axios.post('http://www.micropay.co.il/ExtApi/ScheduleSms.php', { post: 2, token: 'your_token_here', msg: `Hello ${req.body.name}, please enter the link ${req.body.uniqueLink}`, list: req.body.phone, from: 'your_phone_here' }).then(response => {
// Save to database
const sql = 'INSERT INTO messages SET @';
const message = { name: req.body.name, phone: req.body.phone, unique_link: req.body.uniqueLink, hits: 0 };
db.query(sql, message, (err, result) => { if (err) throw err; res.json({success: true}); }); }).catch(err => { console.error(err); res.json({success: false}); }); });
app.listen(port, () => { console.log(`Server running on http://localhost:${port}`); });