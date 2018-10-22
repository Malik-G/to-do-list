const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const port = process.env.PORT || 5000;
const config = {
   database: 'weekend-to-do-app',
   host: 'localhost',
   port: 5432,
   max: 10,
   idleTimeoutMillis: 30000
};
const pool = new pg.Pool(config);

// Tests the connection
pool.on('connect', () => {
   console.log('Connected to the database');
})
pool.on('error', (error) => {
   console.log('Error with database pool', error);
})

app.use(express.static('server/public'));
app.use( bodyParser.urlencoded({extended: true}) );
app.listen( port, () => {
   console.log('up and running on port ', port);
 });

 ////////////
 // ROUTES //
 ////////////
 
 app.get('/todo', (req, res) => {
   sqlText = `SELECT * FROM list ORDER BY completed, id ASC;`;
   pool.query(sqlText)
   .then((result) => {
      res.send(result.rows);
   })
   .catch((error) => {
      console.log(error);
      res.sendStatus(500);
   })
 })

 app.post('/todo/add_task', (req, res) => {
   let dataObj = req.body;
   let sqlText = `INSERT INTO list (task, completed) VALUES ($1, 'No');`
   pool.query(sqlText, [dataObj.task])
      .then((result) => {
         console.log('Post to database successful');
         res.sendStatus(200);
      })
      .catch( (error) => {
         console.log('Error posting to the database:', error);
         res.sendStatus(500);
      })
})
 
 app.put('/todo/status/:id', (req, res) => {
   let reqId = req.params.id;
   let dataObj = req.body;
   sqlText = '';
   if(dataObj.status === 'Yes'){
      sqlText = `UPDATE list SET completed='No' WHERE id=$1;`;
   }
   else if(dataObj.status === 'No'){
      sqlText = `UPDATE list SET completed='Yes' WHERE id=$1;`;
   }
   else{
      res.sendStatus(501);
   }
   pool.query(sqlText, [reqId])
   .then((result) => {
      res.sendStatus(200);
   })
   .catch((error) => {
      console.log('Error upgrading the database:', error);
      res.sendStatus(500);
   })
 })

 app.delete('/todo/delete/:id', (req, res) => {
   let reqId = req.params.id;
   let sqlText = 'DELETE FROM list WHERE id=$1;';
   pool.query(sqlText, [reqId])
      .then((result) =>{
         res.sendStatus(200);
      })
      .catch((error) => {
         res.sendStatus(500);
      })
 })
