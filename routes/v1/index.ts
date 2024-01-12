import express from 'express';
import { AdminRoute } from './admin.routes';
import { RestaurantRoute } from './restaurant.routes';
import { ShoppingRoute } from './shopping.routes';

const router = express.Router();

router.use('/admin', AdminRoute);
router.use('/restaurant', RestaurantRoute);
router.use(ShoppingRoute);

export { router as v1Route }