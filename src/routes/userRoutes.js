import express from 'express';
import UserController from '../adapters/controllers/UserController.js';
import AuthenticationController from '../adapters/controllers/AuthenticationController.js';

const router = express.Router();

router.get('/foom',(req,res)=>{
    res.send("Hello")

})
router.post('/register', UserController.register);
router.patch('/setPrivacy', UserController.createPrivacyPolicy);
router.post('/login', UserController.login);
router.post('/verify', UserController.verifyOtp);
router.put('/update', UserController.updateProfile);
router.post('/vehicle',  UserController.createVehicle);

export default router;
