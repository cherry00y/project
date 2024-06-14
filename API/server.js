const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('anuthida')
})

//ดึงข้อมูลinformation
app.get('/promotion', (req,res) =>{
    const type = 'promrtion';

    connection.query('SELECT title, detail, `date` FROM information WHERE `type` = ?',
        [type], (err, results) => {
            if (err) {
                console.error('Error in GET /promotion:', err);
                return res.status(500).send('Error fetching promotion information');
            }
            return res.status(200).json(results);
        });

})

app.get('/trivia', (req, res) => {
    const type = 'trivia';  // กำหนด type เป็น trivia โดยตรง

    connection.query ('SELECT title, detail, `date` FROM information WHERE `type` = ?', 
        [type], (err, results) => {
        if (err) {
            console.error('Error in GET /trivia:', err);
            return res.status(500).send('Error fetching trivia information');
        }
        return res.status(200).json(results);
    });
});


// เพิ่ม information
app.post('/information', (req, res) => {
    const { title, detail, date, pic, type, id_admin } = req.body;

    // ดึงชื่อของ admin จากตาราง admin โดยใช้ id_admin
    connection.query('SELECT fname, lname FROM `admin` WHERE id = ?', [id_admin], (err, results) => {
        if (err) {
            console.error('Error in selecting admin:', err);
            res.status(500).send('Error selecting admin');
        } else if (results.length === 0) {
            res.status(404).send('Admin not found');
        } else {
            const adminName = `${results[0].fname} ${results[0].lname}`;
            const sql = 'INSERT INTO information (title, detail, `date`, pic, `type`, id_admin, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [title, detail, date, pic, type, id_admin, adminName, null]; // updated_by เป็น null สำหรับการเพิ่มข้อมูลครั้งแรก

            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error('Error in POST /information:', err);
                    res.status(500).send('Error adding information');
                } else {
                    res.status(201).send(results);
                }
            });
        }
    });
});


// แก้ไข information
app.put('/information/:id', (req, res) => {
    const { id } = req.params;
    const { title, detail, pic, type, id_admin } = req.body;
    const date = new Date();

    // ดึงชื่อของ admin จากตาราง admin โดยใช้ id_admin
    connection.query('SELECT fname, lname FROM `admin` WHERE id = ?', [id_admin], (err, results) => {
        if (err) {
            console.error('Error in selecting admin:', err);
            res.status(500).send('Error selecting admin');
        } else if (results.length === 0) {
            res.status(404).send('Admin not found');
        } else {
            const adminName = `${results[0].fname} ${results[0].lname}`;
            connection.query('UPDATE information SET title = ?, detail = ?, `date` = ?, pic = ?, `type` = ?, id_admin = ?, updated_by = ? WHERE id_info = ?',
                [title, detail, date, pic, type, id_admin, adminName, id],
                (err, results) => {
                    if (err) {
                        console.error('Error in PUT /promotion:', err);
                        res.status(500).send('Error updating information promotion');
                    } else {
                        res.status(200).send(results);
                    }
                }
            );
        }
    });
});



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

//login

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    connection.execute(
        'SELECT * FROM admin WHERE username=?',
        [username],
        async (err, results, fields) => {
            if (err) {
                console.error('Error in POST /login:', err);
                return res.status(500).json({ message: 'Error during login' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password.' });
            }

            const user = results[0];

            // เปรียบเทียบรหัสผ่านที่ให้มากับรหัสผ่านที่ถูกแฮชในฐานข้อมูล
            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid username or password.' });
                }

                // สร้าง JWT
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ message: 'Login successful', token });
            } catch (compareError) {
                console.error('Error comparing passwords:', compareError);
                return res.status(500).json({ message: 'Error during login' });
            }
        }
    );
});

app.get('/infoadmin', (req, res) => {
    connection.query(
        'SELECT * FROM admin',
        function (err, results, fields) {
            res.send(results)
        }
    )
})


app.listen(process.env.PORT || 3001, () => {
    console.log('CORS-enabled web server listening on port 3000')
})
