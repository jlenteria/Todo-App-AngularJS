require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const todoRoutes = require('./app/router/todo-router.js')
const boot = require('./app/boot')

const app = express();
const PORT = process.env.PORT || 3000;

boot.init()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/client/src'))
app.use('/api',todoRoutes)


app.get("*", (req,res) => {
	res.sendFile(path.join(__dirname + '/client/src/index.html'))
})

app.listen(PORT, () => {
	console.log("RUNNING SERVER at PORT ", PORT)
})