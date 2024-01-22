require('dotenv').config();
const express = require ('express');
const morgan = require ('morgan');
const {
    newUserController,
    getUserController,
    loginController
}=require('./controller/users');

const app=express();
app.use (morgan ('dev'));

/* Middleware */
app.use ((req,res)=>{
    res.status(404).send({
        status:'error',
        message:'Not found',
    });
});

app.use ((error,req,res,next)=>{
    console.error(error);
    res.status(error.httpStatus ||500).send({
        status:'error',
        message:error.message,
    });
});

app.listen(3000,()=>{
    console.log('servidor funcionando');
});

/* Rutas */
app.post (''/user, (req,res) =>{
    newUserController (req,res);
});

app.get ('/user/:id',(req,res)=>{
    getUserController (req,res);
});

app.post ('/login', (req,res)=>{
    loginController (req,res);
});