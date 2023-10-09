const express = require('express')
const app = express()
const pool = require('./pool.js')
const userRouter = require("./routers/user.js");
const movieRouter = require("./routers/movies.js")
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const morgan = require('morgan')
// const router = require('./endpoints.js')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(morgan('common'))

// app.use(router)

// app.use("/user", userRouter);
// app.use("/movie", movieRouter);

app.use(userRouter);
app.use(movieRouter);

pool.connect((err, res)=>{
    console.log(err)
    console.log('database connected')
})

app.listen(3000)