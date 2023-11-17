import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import {config} from './config.js'
import {initSocket} from './connection/socket.js'
import { connectDB } from './DB/database.js';

// console.log(process.env.JWt_SECRET)
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use('/tweets', tweetsRouter)
app.use('/auth', authRouter)
app.use((req, res, next) => {
    res.sendStatus(404);
});

connectDB().then(() =>{
    const server=app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);