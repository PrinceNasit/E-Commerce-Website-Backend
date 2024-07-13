import getUserIdFromToken from "../config/jwtProvider.js";
import {getUserById} from '../services/user.service.js'


const authenticate=async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).send({error:"Token not found!!"});
        }
        const userId =await getUserIdFromToken(token);
        const user=await getUserById(userId);
        req.user=user;
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
    next();
}

export default authenticate;