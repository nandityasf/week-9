const express= require ('express');
const pool = require('./pool.js');
const router= express.Router();

// ENDPOINT USERS
router.get('/users/:usersId', (req, res) => {
  const usersId = req.params.usersId;
  pool.query('SELECT * FROM users WHERE id = $1', [usersId], (err, result) => {
      if (err) {
        console.error( err);
      } else {
        if (result.rows.length === 0) {
        } else {
          res.json(result.rows);
        }
      }
    });
  });

  // router.post('/users', (req,res)=>{
  //   pool.query(
  //     `INSERT INTO users ("id", "email", "gender", "password", "role") VALUES ($1, $2, $3, $4, $5)`,
  //   [req.body.id, req.body.email, req.body.gender, req.body.password, req.body.role],
  //   (err, result) => {
  //     if (err){
  //     console.error (err)
  //       res.status(500).json(err)
  //     } 
  //     res.status(201).json({status: 'success'})
  //   });
  // });

  // router.put('/users/:id', (req,res)=>{
  //   pool.query(
  //     `UPDATE users SET gender = '${req.body.gender}' WHERE id = ${req.body.id}`,
  //   (err, result) => {
  //     if (err){
  //     console.error (err)
  //       res.status(500).json(err)
  //     } 
  //     res.status(201).json({status: 'success'})
  //   });
  // });

  // router.delete('/users/:id', (req,res)=>{
  //   pool.query(
  //     `DELETE FROM users WHERE id = ${req.body.id}`,
  //   (err, result) => {
  //     if (err){
  //     console.error (err)
  //       res.status(500).json(err)
  //     } 
  //     res.status(201).json({status: 'success'})
  //   });
  // });

//PAGINATION LIMIT 10 MOVIES
// router.get('/movies', function (req, res) {
//   pool.query(
//     `SELECT * FROM movies ${req.query.limit ? ' LIMIT ' + req.query.limit : ''}`, 
//   (err, result)=>{
//       if (err){
//           throw err
//       }
//       res.json(result.rows)
    
//   })
// })

// PAGINATION LIMIT 10 USERS
// router.get('/users', function (req, res) {
//   pool.query(
//     `SELECT * FROM users ${req.query.limit ? ' LIMIT ' + req.query.limit : ''}`, 
//   (err, result)=>{
//       if (err){
//           throw err
//       }
//       res.json(result.rows)
    
//   })
// })

module.exports = router