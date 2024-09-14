import express from 'express';
import cors from 'cors'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import {
    DatBase_URL, MAX_JSON_FILE_SIZE, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE
} from "./app/config/config.js";
import router from './routes/api.js';

const app = express();

// App use default middleware
app.use(cors());
app.use(express.json({limit:MAX_JSON_FILE_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(helmet())

// App use rate limiter
const Limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME ,max: REQUEST_LIMIT_NUMBER})
app.use(Limiter)

//App web cache
app.set('etag', WEB_CACHE)

// Database connection
mongoose.connect(DatBase_URL,{autoIndex:true}).then(()=>{
    console.log("Database Connected!");
}).catch(()=>{
    console.log("Database disconnected!");
})

app.use("/api", router)

app.listen(PORT,()=>{
    console.log("server running on port: " + PORT);
})