import express from "express";
import mongoose from "mongoose";
import { Movie, Rental } from "./schema.js";

const router  = express.Router()

router.post("/",async(req,res)=>{
    try {
        const movie = await Movie.findById(req.body.movie)
        console.log(movie.numberInStock);
        if(movie.numberInStock <= 0) res.status(400).json({
            message : "Movie is out of stock"
        })
        const newrental = await Rental.create(req.body)
        await Movie.findByIdAndUpdate(req.body.movie,{ $inc : { numberInStock : -1}})
        res.status(201).json({
            message : "Successfully added a rental",
            rental : newrental
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.put("/:id",async(req,res)=>{

    try {
        const newrental = await Rental.findById(req.params.id)
        if(newrental.returnDate) res.status(400).json({
            message : "Movie already returned"
        })
        await newrental.updateOne({ $set : { returnDate : Date.now() } } , { new: true})
        await newrental.save()
        await Movie.findByIdAndUpdate(newrental.movie, { $inc : { numberInStock : 1}})
        res.status(201).json({
            message : "Successfully returned a rental",
            rental : newrental
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})


router.get("/",async(req,res)=>{
    try{
        const data =  await Rental.find({})
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

export default router
