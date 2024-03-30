import mongoose from "mongoose";

const equationsSchema=mongoose.Schema({
    equation:{
        type:String,
        required: true,
    },
    equationType:{
        type:String,
        required: true,
    },
    parameteres:{
        type:String,
        required: true,
    },
    parametercount:{
        type:Number,
        required: true,
    }
});
export const equations=mongoose.model('cat',equationsSchema);