import express from 'express';
import config from './config/config.js';
import router from "./router/router.js";
import cors from 'cors';

const app = express();
const { PORT }  = config


app.use(cors());
app.use(express.json())

app.use("/",router);

app.listen(PORT,()=>{
    console.info(`Server is Running on Port Number: ${PORT} Sucessfully.`);
})




