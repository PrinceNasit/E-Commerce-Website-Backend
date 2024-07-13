import jwt from 'jsonwebtoken'

const SECRET_KEY="drtujgkjnbrstrdkoiiouiu";

const generateToken = (userId)=>{
    const token=jwt.sign({userId:userId},SECRET_KEY,{expiresIn:"49h"});
    return token;
}

const getUserIdFromToken=(token)=>{
    const decoded=jwt.verify(token,SECRET_KEY);
    // console.log(decoded);
    return decoded.userId;
}

export default getUserIdFromToken;
export {generateToken};