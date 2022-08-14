const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/studentsapi").then(()=>{console.log("connection is successful")})
.catch(err=>console.error("Connection with mongodb failed",err))