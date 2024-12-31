import dotenv from "dotenv"
import connectDB from "./db/index.js";
import mongoose from "mongoose";
import express from "express"

dotenv.config({path:"./env"})
connectDB()