const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const { JWTPASS } = require("../utilies/config");

const userController = {
    signup: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const user = await User.findOne({ email })
            if (user) {
                return res.json({message:"Already This email used"})
            }
            else {
                const passwordHash = await bcrypt.hash(password, 10)
                const user = new User({
                    name,email,passwordHash
                })
                await user.save()
                return res.json({message:"user created"})
            }
      
        } catch (error) {
            console.log('signup error',error)
            return res.json({message:"signup erro"})
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body
            const user=await User.findOne({email})
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.passwordHash)
                if (!passwordMatch) {
                    return res.json({message:"Invaild Password"})
                }
                const Token = jwt.sign({
                    email: email,
                    id:user._id
                }, JWTPASS)
                return res.json({Token,message:"User Login success",id:user_id})
            }
            return res.json({message:"Invaild User"})
        } catch (error) {
            console.log('signIn error',error)
            return res.json({message:"signIn error"})
        }
    }
}
module.exports = userController;