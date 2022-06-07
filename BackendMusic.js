const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;


const database = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin123456789",
  database: "music",
});

database.connect();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.get('/searchSongs', (req, res) => {
  const query = `SELECT * FROM Songs`;
  database.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});
app.get('/searchArtist', (req, res) => {
  const query = `SELECT * FROM Artist`;
  database.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});
app.get('/searchAlbum', (req, res) => {
  const query = `SELECT * FROM Album`;
  database.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});
// CREATE 

app.get('/addArtist/:name', (req, res) => {
  if (req.params.name != null && typeof req.params.name === 'string') {
    const query = `INSERT INTO Artist VALUES (DEFAULT, "${req.params.name}")`;
    database.query(query, (err, rows, fields) => {
      if (err) throw err;

      res.send('Artist added');
    });
  }
});

// Update table

app.get('/updateArtist/:name/:id', (req, res) => {
  const query = `UPDATE Artist SET name = "${req.params.name}" WHERE artist_id = ${req.params.id}`;
  database.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(`Artist updated with new data: ${req.params.name}`);
  });
});

// Remove data from table

app.get('/deleteArtist/:id', (req, res) => {
  const query = `DELETE FROM Artist WHERE artist_id = ${req.params.id}`;
  database.query(query, (err, rows, fields) => {
    if (err) throw err;
    res.send(`Artist at id: ${req.params.id} has been deleted`);
  });
});