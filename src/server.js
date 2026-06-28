import express from 'express';
import viewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), 'src', '.env') });
const app = express();
const PORT = process.env.PORT || 8080;

viewEngine(app);
initWebRoutes(app);

app.listen(PORT, () =>{
    console.log("JWT Backend is running on the port " + PORT);
})