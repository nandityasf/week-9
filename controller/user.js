const db = require('../pool')
const {signToken} = require("../signToken");

const register = (req, res) => {
    const {id, email, gender, password, role} = req.body;
  
    const query =
      "INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)";
  
    db.query(query, [username, password], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      return res.json({ message: "success"});
    });
  };
      
      const login = (req, res) => {
        const { email, password } = req.body;
      
        const query =
          "SELECT id, email, role FROM users WHERE email=$1 AND password=$2";
      
        db.query(query, [email, password], (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
      
          console.log(result.rows[0])
          const token = signToken(result.rows[0])
      
          return res.json({token});
        });
      
  };
   

module.exports = { register, login }