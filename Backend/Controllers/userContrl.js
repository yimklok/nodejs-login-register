import Users from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createAccessToken = (id) =>{
    return jwt.sign(id,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1d'})
}

const useContr = {
    register: async(req,res)=>{
        try {
            const {name,email,password} = req.body
            const user = await Users.findOne({
                where:{
                    email: email
                }
            })
            if(user) return res.status(400).json({msg: "The email already exists."})
            if(password.length<6) return res.status(400).json({msg: "Password is at least 6 characters long."})
            //Passwoed Encryption
            const passwordHash = await bcrypt.hash(password,10)
            //save to database
            await Users.create({
                name: name,
                email: email,
                password: passwordHash
            })
            res.json({msg: "Register Success!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    login: async(req,res)=>{
        try {
            const {email,password} = req.body
            const user = await Users.findOne({
                where:{
                    email: email
                }
            })
            if(!user) return res.status(400).json({msg: "User does not exist."})
            const isMath = await bcrypt.compare(password,user.password)
            if(!isMath) return res.status(400).json({msg: "Incorrect password."})
            //if login succeess , create accesstoken
            const accesstoken = createAccessToken({id: user.id})
            res.json({accesstoken})
            // res.json({msg: "Login Success!"})  
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getUser: async(req,res)=>{
        try {
            // res.json(req.user)
            const user = await Users.findOne({
                where:{
                    id: req.user.id 
                },
                attributes: ['id','name','email']
            })
            if(!user) return res.status(500).json({msg: "User does not exist."})
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message}) 
        }
    }
}

export default useContr