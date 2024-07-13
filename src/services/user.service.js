import User from '../models/user.model.js'
import bcrypt from "bcrypt"
import getuserProfileByTokenJSW from '../config/jwtProvider.js'

const createUser= async (userData)=>{
    try{
        // console.log(userData);
        let{firstName,lastName,password,email}=userData;
        // console.log(email,typeof(password));
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            throw new Error('User already exist with mail:',email);
        }
        password = await bcrypt.hash(password,8);
        // console.log(password,typeof(password));
        const user=await User.create({firstName,lastName,password,email});
        // console.log(email);
        console.log("User created: ",user);
        return user;
    }
    catch(err){
        // console.log(err);
        throw new Error(err.message);
    }
}

const getUserById= async (userId)=>{
    try{
        const user=await User.findById(userId)
        // .populate("address");
        if(!user){
            throw new Error("User not found with id: ",userId);
        }
        // console.log(typeof(user._id),user._id);
        return user;
    }
    catch(err){
        throw new Error(err.message);
    }
}

const getUserByEmail= async (email)=>{
    try{
        const user=await User.findOne({email});
        if(!user){
            throw new Error("User not found with e-mail: ",email);
        }
        return user;
    }
    catch(err){
        throw new Error(err.message);
    }
}

const getuserProfileByToken= async(token)=>{
    try{
        const userId =await getuserProfileByTokenJSW(token);
        // console.log(typeof(userId))
        const user= await getUserById(userId);
        // console.log(user);
        if(!user){
            throw new Error("User not found with id: ",userId);
        }
        return user;
    }
    catch(err){
        throw new Error(err.message);
    }
}

const getAllUsers=async ()=>{
    try{
        const users = await User.find();
        return users;
    }
    catch(err){
        throw new Error(err.message);
    }
}

export default getAllUsers
export {createUser,getUserById,getUserByEmail,getuserProfileByToken};