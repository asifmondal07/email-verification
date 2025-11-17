const {getuser}=require("../service/auth");

const blacklist=require("../controller/util")


async function requiredAuth(req,res,next){

    const authHeader = req.headers.authorization;

    console.log("authorization:",authHeader);

    if (!authHeader ) {
        return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const token = authHeader;

    if (blacklist.has(token)) {
        return res.status(401).json({ message: "Token has been blacklisted. Please log in again." });
    }

    const user = await getuser(token);
     


    if (!user) {
        return res.status(403).json({ message: "Invalid token! Please log in again." });
    }
    req.user=user;

    next()
};

module.exports=requiredAuth;