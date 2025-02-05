import { Router } from 'express'
import authenticate from '../MiddleWare/auth.js';

const adminauth = Router()
const Library = new Map();

adminauth.post('/addbook',authenticate,(req,res)=>{
    
    try{
        if(req.Userrole == "Admin"){
            const {BookName,BookId,BookType,Description,Price} = req.body
            if(Library.get(BookId)){
                 res.status(400).json({message:"Book already exists"})
            }
            else{
                Library.set(BookId,{BookName,BookId,BookType,Description,Price})
                res.status(200).json({message:"Book added successfully"})
            }
        }
        else{
            res.status(400).json({message:"You are not authorized to perform this action"})
            }
    }

    catch(err){
        res.status(500).json({message:"Internal server error"})

    }
})

adminauth.get('/getbook',(req,res)=>{
    const book = req.query.BookId
    if(Library.get(book)){
        console.log(Library.get(book))
        res.status(200).json(Library.get(book))
      }
      else{
        res.status(400).json({message:'Book not available'})
      }
      
})

adminauth.put('/updatebook',authenticate,(req,res)=>{
    try{
        if(req.Userrole == 'Admin'){
            const {BookName,BookId,BookType,Description,Price} = req.body
            if(Library.get(BookId)){
                Library.set(BookId,{BookName,BookType,Description,Price})
                res.status(201).json({message:'Updated successfully'})
            }
            else{
                res.status(400).json({message:"Does not exits"})
            }
        }
    }
    catch(err){
        res.status(500).json({message:"internal server error"})
    }
})


export {adminauth}