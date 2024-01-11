import express from 'express';
import { getProfile, restaurantLogin, updateProfile, updateServiceAvailable } from '../../controllers/v1';
import { authenticate } from '../../middlewares';

const router = express.Router();

router.post('/login', restaurantLogin);

router.use(authenticate);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.patch('/service', updateServiceAvailable);

export { router as RestaurantRoute }