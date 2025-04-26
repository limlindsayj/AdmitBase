import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { schoolRouter } from "./routes/schools.js";
import { applicationRouter } from "./routes/applications.js";
import loginRoute from './routes/login.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

app.use("/school", schoolRouter);

app.use("/application", applicationRouter);

app.get('/', (req, res) => {
    res.send('API is running');

app.use('/auth/login', loginRoute);

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public/login.html'));
});

app.listen(3001, () => {
    console.log('server listening on 3001');
});
