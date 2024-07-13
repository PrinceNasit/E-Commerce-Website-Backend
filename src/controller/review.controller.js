import {createReview, getAllReview} from '../services/review.service.js'

const createReviews=async(req,res)=>{
    const user=req.user;
    try{
        const review = await createReview(req.body,user);
       return res.status(200).send(review);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const getAllReviews=async(req,res)=>{
    const productId=req.params.productId;
    try{
        const reviews = await getAllReview(productId);
       return res.status(200).send(reviews);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

export{
    createReviews,
    getAllReviews
}