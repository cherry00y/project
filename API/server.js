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

//ลงทะเบียนadmin
app.post('/singup', (req, res) => {
    connection.query(
        'INSERT INTO `admin` (`fname`, `lname`, `phone`,`username`,`password`) VALUES (?, ?, ?, ?, ?)',
        [req.body.fname, req.body.lname, req.body.phone, req.body.username, req.body.password],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /singup:', err);
                res.status(500).send('Error adding singup');
            } else {
                res.status(201).send(results);
            }
        }
    )
})

app.get('/infoadmin', (req, res) => {
    connection.query(
        'SELECT * FROM admin',
        function (err, results, fields) {
            res.send(results)
        }
    )
})



app.listen(process.env.PORT || 3003, () => {
    console.log('CORS-enabled web server listening on port 3002')
})
