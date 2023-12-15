const mongoose = require('mongoose');
require('dotenv').config();

// Function to establish a MongoDB connection
const connectToDatabase = async () => {
  try {
    // Set the 'strictQuery' option to false to prepare for Mongoose 7
    mongoose.set('strictQuery', false);

    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Retrieve the MongoDB connection URL from an environment variable
    const mongoDBUrl = "mongodb+srv://atharva:1234@cluster0.zutzopa.mongodb.net/";

    // Connect to the MongoDB database
    await mongoose.connect(mongoDBUrl, connectionParams);

    console.log('Connected to the MongoDB database successfully');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error.message);
  }
};

// Export the function for use in your application
module.exports = connectToDatabase;
