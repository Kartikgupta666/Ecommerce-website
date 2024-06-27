const express = require('express')
const connectToDatabase = require('./db')
const app = express();
const port = 9000;
const user = require('./User_schema')
connectToDatabase();

app.use(express.json());
// get , post , put , patch

// get 

app.get('/', (req, res) => {
    res.send("hello this is my new end point");
})
// this is the sign up endpoint

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const id = await user.findOne({ email })
    if (id) {
        return res.send("user alredy exist")

    }
    else {
        const data = {
            name: name,
            email: email,
            password: password
        }

        user.insertMany(data);
        return res.send("data is successfully stored");
    }


})

// this is the login endpoint


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const id = await user.findOne({ email });
    if (id) {
        // password check
        const check = id.password;
        const name = id.name;
        if (check == password) {
            return res.send(name)
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