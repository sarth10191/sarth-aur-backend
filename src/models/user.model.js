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

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next()
    
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }

    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }

    )
}


export const User = mongoose.model("User", userSchema);