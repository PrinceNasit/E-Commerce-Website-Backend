import {createRating, getAllRatings} from '../services/rating.service.js'

const createRatings=async(req,res)=>{
    const user=req.user;
    try{
        const review = await createRating(req.body,user);
       return res.status(200).send(review);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const getAllRatingss=async(req,res)=>{
    const productId=req.params.productId;
    try{
        const reviews = await getAllRatings(productId);
       return res.status(200).send(reviews);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

export{
    createRatings,
    getAllRatingss
}