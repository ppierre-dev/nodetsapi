import express from 'express';
import { createFood, getFoods, getProfile, restaurantLogin, updateCoverImage, updateProfile, updateServiceAvailable } from '../../controllers/v1';
import { authenticate, imagesMiddleware } from '../../middlewares';

const router = express.Router();

router.post('/login', restaurantLogin);

router.use(authenticate);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.patch('/service', updateServiceAvailable);
router.patch('/cover-images', imagesMiddleware, updateCoverImage);

router.post('/food', imagesMiddleware, createFood);
router.get('/foods', getFoods);

export { router as RestaurantRoute }