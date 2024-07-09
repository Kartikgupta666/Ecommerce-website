const express = require('express')
const connectToDatabase = require('./db')
const app = express();
const port = 9000;
const User = require('./Schema/User_schema')
const Item = require('./Schema/Item_Schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fetchuser = require('./middleware/fetchuser')
const JWT_SECRET = "Ecom_web"
connectToDatabase();

app.use(express.json());
// get , post , put , patch


// this is the sign up endpoint associate with User schema

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const id = await User.findOne({ email })
    if (id) {
        return res.send("User alredy exist")

    }
    else {

        const salt = await bcrypt.genSaltSync(10);
        const hashpass = await bcrypt.hashSync(password, salt);

        const data = new User({
            name: name,
            email: email,
            password: hashpass
        })

        await data.save();
        const ID = data.id;
        console.log(ID)
        const token = jwt.sign(ID, JWT_SECRET)
        console.log(token)
        return res.send("data is successfully stored");
    }


})

// this is the login endpoint


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        // password check
        const check = await bcrypt.compare(password, user.password)

        if (check) {
            const id = user.id;
            const token = jwt.sign(id, JWT_SECRET)
            console.log(token)
            return res.send("logged in")
        }
        else {
            return res.send("please check credentials")
        }

    }
    else {
        return res.send("sign up first")
    }
})

app.post("/getUserDetails", fetchuser, async (req, res) => {
    try {
        const id = req.user;
        const user = await User.findById(id).select("-password")
        return res.json(user)
    }
    catch (e) {
        console.log(e)
    }
})

// this is the comment for the item schema below this comment all the routes associate with item schema

app.get('/getItem' ,async(req,res)=>{
const item = await Item.find({});
return res.json(item)

})



app.listen(port, () => {
    console.log(`your server listen of port no.${port}`);
})