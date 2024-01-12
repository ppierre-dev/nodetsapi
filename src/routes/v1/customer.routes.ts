import express from 'express';
import { getOtpCustomer, getProfileCustomer, loginCustomer, signUpCustomer, updateProfileCustomer, verifyAccountCustomer } from '../../controllers/v1';
import { authenticate } from '../../middlewares';

const router = express.Router();

router.post('/signup', signUpCustomer);
router.post('/login', loginCustomer);
router.use(authenticate);
router.patch('/verify', verifyAccountCustomer);
router.get('/otp', getOtpCustomer);
router.get('/profile', getProfileCustomer);
router.patch('/profile', updateProfileCustomer);

export { router as CustomerRoute }