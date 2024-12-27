const express =require('express')
const Allroutes =require('./routes/allRoutes')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
const mongoose = require('mongoose');

function MongoDb() {
  mongoose
    .connect(
      'mongodb://127.0.0.1:27017/jobBoard'

    )
    .then(() => console.log('Connected to SSI'))
    .catch(() => console.log(' not connected !'));
}

MongoDb()
app.get('/',(req,res)=>{
    res.send({data:"hi , welcom to our api"})
})

app.use('/all',Allroutes)







app.listen(7000,()=>{
    console.log("app listing port 7000")
})