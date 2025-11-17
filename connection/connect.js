import mongoose from "mongoose";

function mongooseConnect(url){
    mongoose.connect(url)
    .then(()=>console.log("MongoDb Connected"))
    .catch((err)=>{console.log("Error ",err)})
}
export default (mongooseConnect)