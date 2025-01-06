import express from 'express';
import UserController from '../adapters/controllers/UserController.js';
import AuthenticationController from '../adapters/controllers/AuthenticationController.js';
import JwtService from '../infrastructure/auth/JwtService.js';

const router = express.Router();

const authenticationController = new AuthenticationController(JwtService); 


router.get('/foom',(req,res)=>{
    res.send("Hello")
})
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/resendOtp',UserController.resendOtp);
router.post('/verify', UserController.verifyOtp);
router.patch('/updateProfile', authenticationController.authenticate,UserController.updateProfile);
router.post('/addVehicle',  authenticationController.authenticate,UserController.createVehicle);
router.delete('/deleteVehicle',authenticationController.authenticate,UserController.deleteVehicle);
router.patch('/updateVehicle',authenticationController.authenticate, UserController.updateUserVehicle);
router.post('/getVehicleOwner',authenticationController.authenticate,UserController.getVehicleOwner);
router.post('/sendMessage', authenticationController.authenticate,UserController.sendMessageToVehicleOwner);
router.get('/getMyVehicles', authenticationController.authenticate,UserController.getMyVehicle);
router.get('/validateUser', authenticationController.authenticate,UserController.getUSer);
router.post('/sendEMail', authenticationController.authenticate,UserController.handleSendEmail);
router.post('/fcmToken', authenticationController.authenticate,UserController.setToken);
router.post('/send-notification"', authenticationController.authenticate,UserController.sendNotification);

export default router;
