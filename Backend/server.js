const express = require('express')
const connectToDatabase = require('./db')
const app = express();
const port = 9000;
connectToDatabase();

app.use(express.json());
// get , post , put , patch

// get 

app.get('/' , (req , res)=>{
     res.send("hello this is my new end point");
})


app.listen(port ,() => {
    console.log(`your server listen of port no.${port}`);
})