const express = require('express');
require('dotenv').config();
// const mongo= require("./db/connection");
const Student= require("./models/students");
const app = express();
const jwt= require('jsonwebtoken');
const port=process.env.PORT || 3000;
app.use(express.json());
// create a new student
app.get("/students", authenticateToken, async function (req,res){
    const stud = await Student.find();
    res.send(stud.filter(stud=> stud.email=== req.user));
})
app.post("/students",(req,res)=>{
    const stud= new Student(req.body);
    stud.save().then(()=>{
        res.status(201).send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})
app.post("/login",(req,res)=>{
    const email= req.body.email;
    const user= {name: username};
    const accessToken= jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
})
function authenticateToken(req,res,next){
   const authHeader= req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user= user;
        next()
    })
}
app.listen(port,()=>{
    console.log(`CONNECTION IS LIVE AT ${port}`)
})