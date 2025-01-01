import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            requtied : true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            unique: true,
            requtied: true,
            lowercase: true,
            trim: true
        },
        fullname:{
            type: String,
            requtied: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,//cloudinary url
            requried: true,
        },
        cover_image:{
            type: String,//cloudinary url
        },
        watch_history:[
            {
                type: Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password: {
            type: String, //hashed string
            requried:[true, "Password is requried"]
        },
        refresh_token: {
            type:String,
        }

    },
    {timestamps:true}
)


export const User = mongoose.model("User", userSchema);