import express from "express";
import mongoose from "mongoose";
import { Customer } from "./schema.js";

const router  = express.Router()

router.post("/",async(req,res)=>{
    try {
        const newUser = await Customer.create(req.body)
        console.log(newUser)
        res.status(201).json({
            message : "Successfully added a Customer",
            user : newUser
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})


router.post("/auth",async(req,res)=>{
    try {
        const user = await Customer.find({ email : req.body.email})
        if(user.password !== req.body.password) res.status(404).json({
            message : "invalid credentials"
        })
        res.status(201).json({
            message : "Successfully logged in",
            user : user
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

export default router

