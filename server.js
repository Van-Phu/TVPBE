const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
require('dotenv').config();


const recipeRoutes = require('./routes/recipeMasterRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());
app.use(cors());

const db = mongoose.connection;

const apiKey = process.env.API_Key;
mongoose.connect(apiKey, 
  {  useNewUrlParser: true,
  useUnifiedTopology: true})


db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes)


io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('chat message', 'Welcome!');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
