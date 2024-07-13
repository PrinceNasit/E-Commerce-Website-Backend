import Review from '../models/review.model.js'
import { findProductbyId } from './product.service.js'

const createReview=async(data,user)=>{
    const product=await findProductbyId(data.productId);
    
    const review= new Review({
        user:user._id,
        product:product._id,
        review:data.review,
        createdAt:new Date()
    })

    return await review.save();
}

const getAllReview=async(productId)=>{
    // const product=await findProductbyId(data.productId);

    return await Review.find({product:productId}).populate("user");
}

export{
    createReview,
    getAllReview
}