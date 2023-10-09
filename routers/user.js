const router = require("express").Router();
const { register, login } = require("../controller/user");
const pool = require("../pool.js")

router.get('/users', (req, res) => {
    pool.query(
      `SELECT * FROM users ${req.query.limit ? ' LIMIT ' + req.query.limit : ''}`, 
    (err, result)=>{
        if (err){
            console.error(err)
            res.status(500).json(err)
        }else {
            res.json(result.rows)
        } 
    })
  })

  router.post('/users', (req,res)=>{
    pool.query(
      `INSERT INTO users ("id", "email", "gender", "password", "role") VALUES ($1, $2, $3, $4, $5)`,
    [req.body.id, req.body.email, req.body.gender, req.body.password, req.body.role],
    (err, result) => {
      if (err){
      console.error (err)
        res.status(500).json(err)
      } 
      res.status(201).json({status: 'success'})
    });
  });

  router.put('/users/:id', (req,res)=>{
    pool.query(
      `UPDATE users SET gender = '${req.body.gender}' WHERE id = ${req.body.id}`,
    (err, result) => {
      if (err){
      console.error (err)
        res.status(500).json(err)
      } 
      res.status(201).json({status: 'success'})
    });
  });

  router.delete('/users/:id', (req,res)=>{
    pool.query(
      `DELETE FROM users WHERE id = ${req.body.id}`,
    (err, result) => {
      if (err){
      console.error (err)
        res.status(500).json(err)
      } 
      res.status(201).json({status: 'success'})
    });
  });


router.post("/register", register);
router.post("/login", login);

module.exports = router