import mongoose from "mongoose";
import { MONGO_URI } from "../config/dbConnection";

export default async() => {
    mongoose.connect(MONGO_URI).then(() => {
        console.log("✅ Connected to MongoDB");
    }).catch((err) => {
        console.log("❌ Error while connecting to MongoDB", err);
    });
}