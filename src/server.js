import express from "express";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import corsOptions from "./config/cors.js";
import initAPIRoutes from "./routes/api.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
//Fix CORS issue
const cors = require("cors");
app.use(cors(corsOptions));
//
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test cookie
app.use(cookieParser());

//Call function
viewEngine(app);
initWebRoutes(app);
initAPIRoutes(app);

app.listen(PORT, () => {
  console.log("JWT Backend is running on the port " + PORT);
});
