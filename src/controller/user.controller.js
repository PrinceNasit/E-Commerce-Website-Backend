import { getuserProfileByToken } from "../services/user.service.js";
import  getAllUsersService  from "../services/user.service.js";


const getuserProfile=async(req,res)=>{
    try{
        const jwt = req.headers.authorization?.split(" ")[1];

        if(!jwt){
            return res.status(404).send({error:"token not found"});
        }

        const user=await getuserProfileByToken(jwt);
        // console.log(user);  
        return res.status(200).send(user);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

const getAllUsers=async (req,res)=>{
    try{
        const users = await getAllUsersService();
        return res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}

export {getuserProfile,getAllUsers};