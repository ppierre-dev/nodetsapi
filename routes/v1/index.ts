import express from 'express';
import { AdminRoute } from './admin.routes';
import { RestaurantRoute } from './restaurant.routes';

const router = express.Router();

router.use('/admin', AdminRoute);
router.use('/restaurant', RestaurantRoute);

export { router as v1Route }