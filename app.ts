import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/dbConnection';
import { errorHandler } from './middlewares';
import { apiRoute } from './routes/api.routes';

const app = express();

mongoose.connect(MONGO_URI).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((err) => {
    console.log("❌ Error while connecting to MongoDB", err);
});

app.use(express.json()); // Middleware to parse JSON body

app.use('/api', apiRoute);

app.use(errorHandler);

app.listen(8000, () => {
    console.clear();
    console.log("✅ Server is running on port 8000");
});