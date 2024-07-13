import { generateToken } from "../config/jwtProvider.js"
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from "../services/user.service.js"
import { createcart } from "../services/cart.service.js";


const register=async(req,res)=>{
    try{
        // console.log(req.body);
        // console.log(req.body);

        const user = await createUser(req.body);
        const jwt = generateToken(user._id);

        await createcart(user);

        return res.status(200).send({jwt,message:"register success"});
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const login = async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await getUserByEmail(email);

        if(!user){
         return res.status(404).send({message:"user is not found with email; ",email});
        }

        const  isPasswordValid=await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).send({message:"Invalid password"});
        }
        const jwt=generateToken(user._id);
        return res.status(200).send({jwt,message:"Login success"});
    }
    catch(err){
        throw new Error(err.message);
    }
}


export {register,login};