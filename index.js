import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorHandler.js';
import { connectDb } from './config/dbConnection.js';


connectDb();
const app = express();
dotenv.config();

//app.use(bodyParser.json({ extended: true }))
//app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});



