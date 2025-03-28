import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from "../config/env.js";

if(!DB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env<development/production>.local');
}

// connect to mongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
    }
    catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

export default connectToDatabase;