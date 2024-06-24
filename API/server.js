const express = require('express')
const multer = require('multer');
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

// Middleware สำหรับยืนยันโทเค็น
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send('Forbidden: No token provided');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Forbidden: Invalid token');
        }
        req.user = user;
        next();
    });
};

app.get('/', (req, res) => {
    res.send('anuthida')
})

// ดึงข้อมูล information
app.get('/promotion', (req,res) =>{
    const type = 'promotion';

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
    const type = 'trivia';

    connection.query('SELECT title, detail, `date` FROM information WHERE `type` = ?', 
        [type], (err, results) => {
        if (err) {
            console.error('Error in GET /trivia:', err);
            return res.status(500).send('Error fetching trivia information');
        }
        return res.status(200).json(results);
    });
});

// เพิ่ม information
app.post('/information', authenticateToken, upload.single('pic'), (req, res) => {
    const { title, detail, date, type } = req.body;
    const id_admin = req.user.id;
    const pic = req.file ? req.file.buffer : null;

    connection.query('SELECT fname, lname FROM `admin` WHERE id = ?', [id_admin], (err, results) => {
        if (err) {
            console.error('Error in selecting admin:', err);
            res.status(500).send('Error selecting admin');
        } else if (results.length === 0) {
            res.status(404).send('Admin not found');
        } else {
            const adminName = `${results[0].fname} ${results[0].lname}`;
            connection.query('INSERT INTO infor (title, detail, `date`, pic, `type`, id_admin, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, detail, date, pic, type, id_admin, adminName, null], (err, results) => {
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
app.put('/information/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, detail, pic, type} = req.body;
    const id_admin = req.user.id;
    const date = new Date();

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

// ลงทะเบียน admin
app.post('/signup', (req, res) => {
    const { fname, lname, phone, username, password } = req.body;

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

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    res.status(500).send('Error processing signup');
                    return;
                }

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

// login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    connection.execute('SELECT * FROM admin WHERE username=?',[username], async (err, results, fields) => {
            if (err) {
                console.error('Error in POST /login:', err);
                return res.status(500).json({ message: 'Error during login' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password.' });
            }

            const user = results[0];

            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid username or password.' });
                }

                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ message: 'Login successful', token });
            } catch (compareError) {
                console.error('Error comparing passwords:', compareError);
                return res.status(500).json({ message: 'Error during login' });
            }
        }
    );
});



app.listen(process.env.PORT || 3008, () => {
    console.log(`CORS-enabled web server listening on port ${process.env.PORT || 3008}`)
})
