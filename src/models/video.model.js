import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema= new Schema(
    {
        videofile:{
            type:String,
            required: true,
        },
        thumbnail:{
            type: String,
            requried: true,
        },
        title:{
            type: String,
            requried: true
        },
        description:{
            type: String,
            // required: true,
        },
        duration:{
            type: Number, 
            requried: true,
        },
        isPublished:{
            type:Boolean,
            required:true,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User" 
        }
    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)