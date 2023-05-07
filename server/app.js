import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import moviesrouter from "./moviesrouter.js"
import userrouter from "./userrouter.js"
import rentalrouter from "./rentalrouter.js"


dotenv.config()


const app = express()
app.use(express.json())
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB");
    }catch(err){
        console.log("Could not connect"+err.message);
    }
}

app.use("/api/movies", moviesrouter)
app.use("/api/rentals", rentalrouter)
app.use("/api/users", userrouter)

app.listen(8000, ()=>{
    connectDB()
    console.log("listening to 8000");
})