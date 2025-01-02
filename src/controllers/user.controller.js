import { asyncHandler } from "../utils/AsyncHAndler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId)
        const accesstoken =  user.generateAccessToken()
        const refreshtoken =  user.generateRefreshToken()

        user.refresh_token = refreshtoken
        await user.save({validateBeforeSave:false})

        return {accesstoken, refreshtoken}

    }
    catch (error){
        throw new ApiError(500, "Something went wrong while generating Access and Refresh Tokens.")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullname, emial, username, password} = req.body
    if ([fullname, emial, username, password].some((field)=>field.trim()==="")){
        throw new ApiError(400, "All fields are requried")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser){
        throw new ApiError(400, "Username already exists.")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )
