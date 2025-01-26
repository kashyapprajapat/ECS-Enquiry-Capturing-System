import express from 'express';
import config from './config/config.js';
import router from "./router/router.js";
import cors from 'cors';

const app = express();
const { PORT }  = config


app.use(cors());
app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        uptime: process.uptime(), 
        timestamp: new Date().toISOString()
    });
});


app.use("/",router);



app.listen(PORT,()=>{
    console.info(`Server is Running on Port Number: ${PORT} Sucessfully.`);
})




