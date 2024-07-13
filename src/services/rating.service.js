import Rating from '../models/rating.model.js'
import { findProductbyId } from './product.service.js'

const createRating=async(data,user)=>{
    const product=await findProductbyId(data.productId);
    
    const rating= new Rating({
        user:user._id,
        product:product._id,
        rating:data.rating,
        createdAt:new Date()
    })
    return await rating.save();
}

const getAllRatings=async(productId)=>{
    return await Rating.find({product:productId}).populate("user");
}

export{
    createRating,
    getAllRatings
}