
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_db'
});
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


app.post('/register', upload.single('profile_image'), (req, res) => {
    const { email, password } = req.body;
    const profileImage = req.file ? req.file.path : '';
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });
        db.query('INSERT INTO users (email, password, profile_image) VALUES (?, ?, ?)',
            [email, hash, profileImage], (err, result) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: 'User Registered' });
            });
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(400).json({ message: 'User not found' });
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign({ id: result[0].id }, 'secret_key', { expiresIn: '1h' });
                res.json({ token, user: result[0] });
            } else {
                res.status(400).json({ message: 'Invalid Credentials' });
            }
        });
    });
});


app.get('/dashboard/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
});


app.post('/blogs', upload.single('blog_image'), (req, res) => {
    const { title, description, userId } = req.body;
    const image = req.file ? req.file.path : '';
    db.query('INSERT INTO blogs (title, image, description, userId) VALUES (?, ?, ?, ?)',
        [title, image, description, userId], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Blog Created' });
        });
});

app.get('/blogs/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM blogs WHERE userId = ?';

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Blog not found' });

        res.json(result);
    });
});



app.put('/blogs/:id', upload.single('blog_image'), (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : req.body.image;
    db.query('UPDATE blogs SET title = ?, image = ?, description = ? WHERE id = ?',
        [title, image, description, req.params.id], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Blog Updated' });
        });
});

app.delete('/blogs/:id', (req, res) => {
    db.query('DELETE FROM blogs WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Blog Deleted' });
    });
});


app.get('/blogs/:id/:user_id', (req, res) => {
    const { id, user_id } = req.params;
    const query = 'SELECT * FROM blogs WHERE id = ? AND userId = ?';

    db.query(query, [id, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length === 0) return res.status(404).json({ message: 'Blog not found for this user' });

        res.json(result[0]); 
    });
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
