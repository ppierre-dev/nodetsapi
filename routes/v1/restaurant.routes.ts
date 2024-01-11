import express from 'express';
import { createFood, getFoods, getProfile, restaurantLogin, updateProfile, updateServiceAvailable } from '../../controllers/v1';
import { authenticate } from '../../middlewares';

const router = express.Router();

router.post('/login', restaurantLogin);

router.use(authenticate);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.patch('/service', updateServiceAvailable);

router.post('/food', createFood);
router.get('/foods', getFoods);

export { router as RestaurantRoute }