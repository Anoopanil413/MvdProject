import express from 'express';
import UserController from '../adapters/controllers/UserController.js';
import authenticate from '../adapters/controllers/AuthenticationController.js';

const router = express.Router();

router.get('/foom',(req,res)=>{
    res.send("Hello")

})
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/update', authenticate,UserController.updateProfile);
router.post('/verify', UserController.verifyOtp);

export default router;
