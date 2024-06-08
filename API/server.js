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

    // ตรวจสอบการใช้ phone ซ้ำ
    connection.query('SELECT * FROM `admin` WHERE `phone` = ?', [phone], (err, results) => {
        if (err) {
            console.error('Error checking phone:', err);
            res.status(500).send('Error processing signup');
            return;
        }

        if (results.length > 0) {
            res.status(400).send('Phone number already in use');
            return;
        }

        // ตรวจสอบการใช้ username ซ้ำ
        connection.query('SELECT * FROM `admin` WHERE `username` = ?', [username], (err, results) => {
            if (err) {
                console.error('Error checking username:', err);
                res.status(500).send('Error processing signup');
                return;
            }

            if (results.length > 0) {
                res.status(400).send('Username already in use');
                return;
            }

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



app.listen(process.env.PORT || 3004, () => {
    console.log('CORS-enabled web server listening on port 3004')
})
