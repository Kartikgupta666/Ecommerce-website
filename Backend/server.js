const express = require('express')
const connectToDatabase = require('./db')
const app = express();
const port = 9000;
const User = require('./Schema/User_schema')

const bcrypt = require('bcryptjs')

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









app.listen(port, () => {
    console.log(`your server listen of port no.${port}`);
})