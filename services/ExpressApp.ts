import express, { Application } from "express"
import { errorHandler } from "../middlewares";
import { apiRoute } from "../routes/api.routes";

export default async(app: Application) => {
    app.use(express.json()); // Middleware to parse JSON body
    app.use(express.urlencoded({ extended: true })); // Middleware to parse URL encoded body

    app.use('/api', apiRoute);

    app.use(errorHandler);

    return app;
}