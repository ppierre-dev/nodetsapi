import express from 'express';
import App from './services/ExpressApp';
import Database from './services/Database';

const startServer = async () => {
    const app = express();

    await App(app);
    await Database();
    
    app.listen(8000, () => {
        console.clear();
        console.log("✅ Server is running on port 8000");
    });
}

startServer();
