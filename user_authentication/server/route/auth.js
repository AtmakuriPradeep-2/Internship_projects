// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
   const { username, password } = req.body;
   try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({ username, password: hashedPassword });
       await newUser.save();
       res.status(201).send('User registered');
   } catch (err) {
       res.status(400).send(err.message);
   }
});

// Login
router.post('/login', async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username });
   if (!user || !(await bcrypt.compare(password, user.password))) {
       return res.status(401).send('Invalid credentials');
   }

   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
   res.cookie('token', token, { httpOnly: true }); // Set token as cookie
   res.json({ message: 'Login successful' });
});

// Middleware for protected routes
const authMiddleware = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) return res.status(403).send('Forbidden');

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
       if (err) return res.status(403).send('Forbidden');
       req.user = user;
       next();
   });
};

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
   res.send(`Hello, ${req.user.username}. You have access to this protected route.`);
});

module.exports = router;
