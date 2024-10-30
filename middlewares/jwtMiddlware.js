const jwt = require("jsonwebtoken")

//middleware
const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtmiddleware");

    //get token from the req header "Authorization key"
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);

    //step to verify token
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_PASSWORD)
            console.log(jwtResponse);
            req.userId = jwtResponse.userId
            next()

        } catch {
            res.status(401).json("please login to proceed the step!!! authentication failed")
        }
    }
    else {
        res.status(406).json("authrntication failed...Token Missing")
    }
}
module.exports = jwtMiddleware