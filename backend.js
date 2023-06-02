const express = require('express');
const mysql = require('mysql2');
require('dotenv').config({ path: 'cred.env' });
const fs = require('fs');

const app = express();
const port = 3000; //port number

const createData = require('./crud oper/create');
const retrieveData = require('./crud oper/read');
const updateData = require('./crud oper/update');
const deleteData = require('./crud oper/delete');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const html = fs.readFileSync('./views/frontend.html', 'utf8');
  res.send(html);
});

app.post('/insert', (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const f_name = req.body.f_name;
  const l_name = req.body.l_name;
  const dob = req.body.dob;
  const address = req.body.address;
  const phno = req.body.phno;

  const u_n = f_name.substring(0, 2) + l_name.substring(0, 2);
  const pass = f_name.substring(0, 2) + l_name.substring(0, 2) + phno.substring(6);

  const data = [id, u_n, pass, email, f_name, l_name, dob, address, phno];

  createData(pool, data, (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      res.send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully!');
    res.send('Data inserted successfully!');
  });
});

app.post('/update', (req, res) => {
  const id = req.body.update_id;
  const email = req.body.new_email;

  const updateDataArr = [email, id];

  updateData(pool, updateDataArr, (err, result) => {
    if (err) {
      console.error('Error updating data: ', err);
      res.send('Error updating data');
      return;
    }
    console.log('Data updated successfully!');
    res.send('Data updated successfully!');
  });
});

app.get('/select', (req, res) => {
  retrieveData(pool, (err, rows) => {
    if (err) {
      console.error('Error retrieving data: ', err);
      res.send('Error retrieving data');
      return;
    }
    console.log('Retrieved data: ', rows);
    res.send('Retrieved data: ' + JSON.stringify(rows));
  });
});

app.post('/delete', (req, res) => {
  const id = req.body.delete_id;

  deleteData(pool, id, (err, result) => {
    if (err) {
      console.error('Error deleting data: ', err);
      res.send('Error deleting data');
      return;
    }
    console.log('Data deleted successfully!');
    res.send('Data deleted successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
