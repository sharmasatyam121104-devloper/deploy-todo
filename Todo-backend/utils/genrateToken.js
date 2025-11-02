import jwt from "jsonwebtoken";

const genrateToken = (user)=>{
    const payLoad = {
        user: {
            id:user._id,
        },
    };
    const token = jwt.sign(payLoad,"secretkey",{expiresIn:36600})
    return token;
}

export default genrateToken;