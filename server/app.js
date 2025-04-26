import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { schoolRouter } from "./routes/schools.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json()); // Good to include for parsing JSON requests

app.use("/school", schoolRouter);

app.get('/', (req, res) => {
res.send('API is running');
});

app.listen(3001, () => {
    console.log('server listening on 3001');
})
