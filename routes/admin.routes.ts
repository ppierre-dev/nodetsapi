import express from 'express';
import { createRestaurant, getRestaurantById, getRestaurants } from '../controllers';

const router = express.Router();

router.post('/restaurant', createRestaurant);
router.get('/restaurants', getRestaurants);
router.get('/restaurant/:id', getRestaurantById);

export { router as AdminRoute }