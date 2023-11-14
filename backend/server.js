const express=require("express");
const app=express()
var cors = require('cors');
app.use(cors())
const dotenv = require('dotenv').config();
const mongoose=require("mongoose")
const PORT=process.env.PORT;
app.use(express.json());
mongoose.connect("mongodb://rahaman:9381593787@ac-svxb6vb-shard-00-00.keuyd16.mongodb.net:27017,ac-svxb6vb-shard-00-01.keuyd16.mongodb.net:27017,ac-svxb6vb-shard-00-02.keuyd16.mongodb.net:27017/?ssl=true&replicaSet=atlas-17kbbc-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => console.log(err));


app.use("/api/todos",require("./routes/todo"))

app.listen(PORT,()=>console.log(`server start running on ${PORT}`));

