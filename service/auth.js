import jwt from 'jsonwebtoken'





import config from "../config.js";




function setuser(user){
    let token=jwt.sign({    
        email:user.email,
        name:user.name,
        phoneNumber:user.phoneNumber,
        password:user.password        
    },config.jwtSecret,{ expiresIn: "1000000m" });

    
    return token;
}

async function getuser(token){

    if(!token)return null;

    try {
                
        const decoded=jwt.verify(token,config.jwtSecret);
        

       const { email, name, password, phoneNumber } = decoded;
        

        return { email, name, password, phoneNumber }
        
    } catch (error) {
        console.error("JWT verification error:", error.message)
        return null
    }
}



export  {setuser,getuser}