const mongoose = require("mongoose");
require("dotenv").config();  // Load environment variables from .env file

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,  // Prevent the deprecation warning
        };

        // Get the MongoDB URI from the environment variables
        const mongoURI = process.env.MONGO_URI;

        // Connect to the MongoDB database using the connection string from the .env file
        await mongoose.connect(mongoURI, connectionParams);
        console.log("Connected to database.");
    } catch (error) {
        console.log("Could not connect to database.", error);
    }
};
