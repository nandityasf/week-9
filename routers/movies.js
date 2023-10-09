const router = require("express").Router();
const { authentication } = require("../jwt.js");
const pool = require("../pool.js")

// router.get("/", (req, res) => {
//     res.send("get movies");
//   });
//   router.post("/movies", (req, res) => {
//     res.send("create movie");
//   });
//   router.get("/movies/:id", (req, res) => {
//     res.send("get movie");
//   });
//   router.put("/movies/:id", authentication, (req, res) => {
//     res.send("update movie");
//   });
//   router.delete("/movies/:id", authentication, (req, res) => {
//     res.send("delete movie");
//   });

// ENDPOINT AND PAGINATION MOVIES
router.get('/movies', (req, res) => {
    pool.query(
      `SELECT * FROM movies ${req.query.limit ? ' LIMIT ' + req.query.limit : ''}`, 
    (err, result)=>{
        if (err){
            console.error(err)
            res.status(500).json(err)
        } else{
            res.json(result.rows)
        }
      
    })
  })
  
    router.post('/movies', (req,res)=>{
      pool.query(
        `INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4)`,
      [req.body.id, req.body.title, req.body.genres, req.body.year],
      (err, result) => {
        if (err){
        console.error (err)
          res.status(500).json(err)
        } 
        res.status(201).json({status: 'success'})
      });
    });
  
    router.put('/movies/:id', (req,res)=>{
      pool.query(
        `UPDATE movies SET genres = '${req.body.genres}' WHERE id = ${req.body.id}`,
      (err, result) => {
        if (err){
        console.error (err)
          res.status(500).json(err)
        } 
        res.status(201).json({status: 'success'})
      });
    });
  
    router.delete('/movies/:id', (req,res)=>{
      pool.query(
        `DELETE FROM movies WHERE id = ${req.body.id}`,
      (err, result) => {
        if (err){
        console.error (err)
          res.status(500).json(err)
        } 
        res.status(201).json({status: 'success'})
      });
    });


module.exports = router;