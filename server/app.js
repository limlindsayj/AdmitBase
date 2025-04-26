import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser"; 
import path from "path";
import { fileURLToPath } from "url";
import { schoolRouter } from "./routes/schools.js";
import { applicationRouter } from "./routes/applications.js";
import loginRouter from './routes/login.js';
import submitRoute from './routes/submit-profile.js';


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/school", schoolRouter);

app.use('/submit-stats', submitRoute);
app.use("/application", applicationRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(3001, () => {
    console.log('server listening on 3001');
});
