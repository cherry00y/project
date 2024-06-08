const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('anuthida')
})

//ดึงข้อมูลinformation
app.get('/promotion', (req,res) =>{


})

app.get('/trivia', (req,res) =>{

})

app.post('/promotion', (req,res) =>{
    connection.query(
        
    )
})


app.listen(process.env.PORT || 3002, () => {
    console.log('CORS-enabled web server listening on port 3001')
})
