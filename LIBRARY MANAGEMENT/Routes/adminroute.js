import { Router } from "express";
import dotenv from "dotenv";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config()
const adminroute = Router();
const user = new Map()

adminroute.post('/signup',async(req,res)=>{
    try{
        const {FirstName,LastName,UserName,Email,Password,UserRole} = req.body;
        const newPassword = await bycrpt.hash(Password, 10)
        if(user.get(UserName)){
            return res.status(400).json({message:"User already exist"})
        }
        else{
            user.set(UserName,{FirstName,LastName,Email,Password:newPassword,UserRole})
            res.status(201).json({message:" Signup successfully"})
            console.log(UserName,{FirstName,LastName,Email,Password:newPassword,UserRole})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server error"})
    }
    

})

adminroute.post('/login',async(req,res)=>{
    try{
        const {UserName,Password} = req.body;
        const result = user.get(UserName)
        if(!result){
            return res.status(400).json({message:"User not found"})
        }
        else{
            const valid =  await bycrpt.compare(Password,result.Password)
            if(valid){
               const token = jwt.sign({UserName:UserName,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:"1h"})
               res.cookie('authToken',token,{
                httpOnly:true,
               })
               res.status(200).json({message:"Login successfully"})
            }
            else{
                return res.status(400).json({message:"Invalid Password"})
                }
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server error"})
        }
})

adminroute.get('/logout',(req,res)=>{
    res.clearCookie('authToken')
    res.status(201).json({message:"logout successfully"})
})

export {adminroute}