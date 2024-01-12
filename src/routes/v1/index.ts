import express from 'express';
import { AdminRoute } from './admin.routes';
import { RestaurantRoute } from './restaurant.routes';
import { ShoppingRoute } from './shopping.routes';
import { CustomerRoute } from './customer.routes';

const router = express.Router();

router.use('/admin', AdminRoute);
router.use('/restaurant', RestaurantRoute);
router.use('/customer', CustomerRoute);
router.use(ShoppingRoute);

export { router as v1Route }