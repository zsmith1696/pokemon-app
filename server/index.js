const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

// Creating a connection pool to the MySQL database
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "pokemon_types",
});

// Use cors middleware to handle cross-origin resource sharing (CORS)
app.use(cors());

// Use express.json() middleware to handle json request data
app.use(express.json());

// Use body-parser middleware to handle url encoded data
app.use(bodyParser.urlencoded({extended: true}));

// POST route to handle inserting a new pokemon to the database
app.post('/api/insert', (req, res) => {

    // extracting the pokemon name and type from the request body
    const pkmName = req.body.pkmName;
    const pkmType = req.body.pkmType;

    //creating the sql query
    const sqlInsert = "INSERT INTO pokemon_types.pkm_info (pkmName, pkmType) VALUES (?,?)"
    //execute query to insert new pokemon
    db.query(sqlInsert, [pkmName, pkmType], (err, result)=> {
        console.log(err);

    })
    
});

// GET route to handle searching for pokemons by type
app.get('/api/pokemon/search', (req, res) => {
    // get the type value from query parameter
    const type = req.query.pkmType;
    // create the mysql query
    const query = 'SELECT * FROM pokemon_types.pkm_info WHERE pkmType = ?';
    // execute the query
    db.query(query, [type], (error, results) => {
      if (error) {
        // send the error message as response if any error occurs
        res.status(500).json({ error: error });
      } else {
        // send the query results as response if the query is successful
        res.json(results);
      }
    });
  });

app.listen(3001, () => {
    console.log('running on port 3001')
});
