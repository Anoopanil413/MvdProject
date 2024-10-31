import express from 'express';
import UserController from '../adapters/controllers/UserController.js';
import authenticate from '../adapters/controllers/AuthenticationController.js';

const router = express.Router();

router.get('/foom',(req,res)=>{
    res.send("Hello")

})
router.post('/register', UserController.register);
router.patch('/setPrivacy', UserController.register);
router.post('/login', UserController.login);
router.post('/verify', UserController.verifyOtp);
router.put('/update', authenticate,UserController.updateProfile);
router.post('/vehicle', authenticate, UserController.createVehicle);

export default router;
