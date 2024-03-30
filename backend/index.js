import express, { request, response } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {equations} from "./models/mimaxquations.js";
import equationRoute from "./route/equationRoute.js";
import cors from 'cors';

const app= express()

app.use(express.json());
app.use(cors());

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }));

app.use('/equations',equationRoute);

app.get('/',(request,response)=>{
     console.log(request);
     return response.status(200).send("working fine");
});



mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("mongodb connected");
    app.listen(PORT,()=>{
        console.log(`app is working fine:${PORT}`)
    });

})
.catch((error)=>{
    console.log(error);

});