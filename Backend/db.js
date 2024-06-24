const mongoose = require('mongoose')

const url = `mongodb+srv://kartikgangil:220456@cluster0.mgxoc93.mongodb.net/`

function connectToDatabase(){
    mongoose.connect(url)
    .then(()=>{
        console.log("database connected successfully")
    })
    .catch(e =>{
        console.log(e)
    })
}


module.exports = connectToDatabase