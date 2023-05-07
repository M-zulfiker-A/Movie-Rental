import express from "express";
import mongoose from "mongoose";
import { Movie } from "./schema.js";


const router = express.Router()

router.get("/",async(req,res)=>{
    const {query} = req.query
    let search = {}
    if(query){
        search = {
            $or : [
                { title : { $regex : query , $options : "i"}},
                { genre : { $regex : query , $options : "i"}}
            ]
        }
    }
    try {
        const data = await Movie.find(search)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const data = await Movie.findById(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.post("/",async(req,res)=>{
    try {
        const newMov = await Movie.create(req.body)
        res.status(201).json({
            message  : "Successfullly created movie",
            movie : newMov
        })
    } catch (error) {
        res.status(400).json({
            message  : error.message
        })
    }
})


router.put("/:id",async(req,res)=>{
    try {
        const data = await Movie.findByIdAndUpdate(req.params.id,req.body, {new : true})
        res.status(201).json({
            message  : "Successfullly updated movie",
            movie : data
        })
    } catch (error) {
        res.status(400).json({
            message  : error.message
        })
    }
})


export default router