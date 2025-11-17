import express from 'express'
import {handelEmailVerify,handelLogin,handelLogout,handelUserCReate} from '../controller/user.js'
import multer from 'multer';
const upload = multer();
const route=express.Router();




route.post("/create",upload.none(),handelUserCReate)
route.get("/login",upload.none(),handelLogin)
route.get('/verify/:token',handelEmailVerify)   
route.get('/logout',handelLogout)


export default route



