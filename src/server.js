const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('', routes);

async function startServer() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/kahootAPI';
    console.log('Attempting to connect to MongoDB...');
    
    const mongooseOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    
    await mongoose.connect(mongoURI, mongooseOptions);
    console.log(`Mongoose connected to MongoDB Atlas`);

    const port = process.env.PORT || 9090;
    app.listen(port);

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

startServer();
