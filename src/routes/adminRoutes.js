import express from 'express';
// import AdminController from '../adapters/controllers/AdminController.js';

const router = express.Router();
router.get('/foom',(req,res)=>{
    res.send("Hello")

})

// router.post('/create', AdminController.createAdmin);
// router.post('/login', AdminController.loginAdmin);
// router.post('/verify/:adminId', AdminController.verifyAdmin);

export default router;
