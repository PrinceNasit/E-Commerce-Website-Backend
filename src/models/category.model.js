import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
    maxlength:50
   },
    parentCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }],
    level: {
        type: Number,
        required: true
    },

})


const Category=mongoose.model("category",categorySchema);

export default Category;