const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
app.post('/signup', (req, res) => {
    const { fname, lname, phone, username, password } = req.body;

            // แฮชรหัสผ่านก่อนเก็บลงฐานข้อมูล
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    res.status(500).send('Error processing signup');
                    return;
                }

                // แทรกข้อมูลลงฐานข้อมูล
                connection.query(
                    'INSERT INTO `admin` (`fname`, `lname`, `phone`, `username`, `password`) VALUES (?, ?, ?, ?, ?)',
                    [fname, lname, phone, username, hash],
                    (err, results) => {
                        if (err) {
                            console.error('Error in POST /signup:', err);
                            res.status(500).send('Error adding signup');
                        } else {
                            res.status(201).send(results);
                        }
                    }
                );
            });
        });


app.get('/infoadmin', (req, res) => {
    connection.query(
        'SELECT * FROM admin',
        function (err, results, fields) {
            res.send(results)
        }
    )
})



app.listen(process.env.PORT || 3003, () => {
    console.log('CORS-enabled web server listening on port 3003')
})
