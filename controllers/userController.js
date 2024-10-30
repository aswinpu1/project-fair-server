// const req = require("express/lib/request");
// const res = require("express/lib/response");
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
//register logic
exports.registerController = async (req, res) => {
    console.log("inside registerController");
    const { username, email, password } = req.body
    console.log(username, email, password);

    //check email is present in mongodb
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            //alraedy user
            res.status(406).json("Already  account exists!!! please login...")
        } else {
            //register user
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profilepic: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }
    // res.status(200).json("Register request recievd!!!")


}


//login logic

exports.loginController = async (req, res) => {
    console.log("inside login controlller");
    //get user details from request body
    const { email, password } = req.body
    console.log(email, password);
    //check email and pass word in user model

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            //allow login
            //generate token using jwt
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user: existingUser,token
            })
        } else {
            //incorrect
            res.status(404).json("invalid email/password!!")
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

//profile updation logic - authorisation required
exports.editProfileController = async(req,res)=>{
    console.log("inside editProfileController");
    const {username,email,password,github,linkedin,profilepic}=req.body
    const profilepicupld = req.file?req.file.filename:profilepic
    const userId = res.userId
    try {
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilepic:profilepicupld
        },{new:true})
        await upadatedUser.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(401).json(err)
    }
    
}