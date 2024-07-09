const jwt = require('jsonwebtoken')

const JWT_SECRET = "Ecom_web"
const fetchuser = (req, res, next) => {
    const token = req.header("authToken")

    if (!token) {
        return res.status(400).send("unauthorised error")
    }
    else {
        try {
            const data = jwt.verify(token, JWT_SECRET)
            console.log(data)
            req.user = data
            next()
        }
        catch (e) {
            res.status(401).send(e)
        }
    }
}


module.exports = fetchuser