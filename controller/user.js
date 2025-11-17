import User from "../model/user.js"
import  {setuser, getuser}  from "../service/auth.js";
import bcrypt from "bcryptjs";
import sendVerificationEmail from './email.js'
import blacklist from "./util.js";





async function handelUserCReate(req,res){
    try {
        const {name,email,phone,password}=req.body


    if(!name || !email || !phone || !password){
        return res.status(400).json({message:"Require All Field"})
    }

    const salt= await bcrypt.genSalt(10);
    const hashpassword=await  bcrypt.hash(password,salt);


    const newUser=  {
        name:name,
        email:email,
        phoneNumber:phone,
        password:hashpassword
    }
    console.log(newUser)
    const token=setuser(newUser)
    
    await sendVerificationEmail(email, token);
    res.json({ 
        message: 'Verification email sent' ,
        token: token 
    });


    } catch (error) {
         res.status(500).json({message:"Error Created User",error:error.message});
    }
}


async function handelEmailVerify(req, res){
  const { token } = req.params;
console.log("token:", token)
  try {
    const decoded =await getuser(token);
    console.log("Decoded Token:", decoded);

    if (!decoded) {
      return res.status(400).send(' Invalid or expired token');
    }

     const { name, email, phoneNumber, password } = decoded;
    
    const existing = await User.findOne({ email });
    if (existing) return res.send('User already have a account this email ',email);
    
    
    // Create user after verification
    const newUser = new User({
      name,
      email,
      phoneNumber: phoneNumber,
      password,
      isVerified: true
    });

    await newUser.save();

    res.send('Email verified and user created!');

  } catch (err) {
    console.error('Verification error:', err.message);
    res.status(400).send(' Error verify token');
  }
};

async function handelLogin(req,res) {
    try {
        const { email, password } = req.body;

        const newUser = await User.findOne({ email });

        if (!newUser) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, newUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        
        const name = newUser.name;
        const id= newUser._id;
        const token = setuser(newUser);

        return res.status(200).json({
            name,
            id,
            message: "Your login was successful",
            token
        });

    }  catch (error) {
          res.status(500).json({message:"Error Login User",error:error.message});
    }
}

async function handelLogout(req,res) {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(400).json({ message: "No token provided" });

        blacklist.add(token); // Store token in blacklist
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
}


export {
    handelUserCReate,
    handelLogin,
    handelEmailVerify,
    handelLogout
}