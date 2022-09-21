const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const {PORT , MONGOD_URL,CLIENT_URL} = process.env;
const router = require('./routers/allRouters');
const app = express();
const errorMiddeleware = require("./middleware/errorMiddleware");


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:CLIENT_URL
}));
app.use("/api", router);
app.use(errorMiddeleware);


const start = async()=>{
    try{
        await mongoose.connect(MONGOD_URL,{
            useNewUrlParser:true,
        });
        app.listen(PORT,()=>console.log(`SERVER STARTED ON PORT ${PORT}`));
    }
    catch(error){
        console.log(error);
    }
} ;
start();