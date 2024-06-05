// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Load environment variables
        require('dotenv').config();

        // Ensure that MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined in the environment variables.");
            process.exit(1);
        }

        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true, // This can be removed if it causes warnings
            // useCreateIndex: true, // If you're using older mongoose versions, this can be removed in newer versions
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
