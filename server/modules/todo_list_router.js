const express = require('express');
const router = express.Router();
const pool = require('./pool');

router.get('/', (req, res) => {
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

 router.post('/add_task', (req, res) => {
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
 
 router.put('/status/:id', (req, res) => {
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

 router.delete('/delete/:id', (req, res) => {
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

module.exports = router