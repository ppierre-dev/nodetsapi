import express from 'express';
import { displayRestaurant, getFoodsIn30Mins, getRestaurantsAvailable, getTopRestaurants, searchFoods } from '../../controllers/v1';

const router = express.Router();

router.get('/:postalcode', getRestaurantsAvailable) // Liste des plats disponibles dans une ville (code postal)
router.get('/top-restaurants/:postalcode/:quantity', getTopRestaurants) // Liste des restaurants les mieux notés dans une ville (code postal)
router.get('/food-in-30-minutes/:postalcode', getFoodsIn30Mins) // Liste plats livrés en moins de 30 minutes dans une ville (code postal)
router.get('/search/:postalcode', searchFoods) // Recherche de plats dans une ville (code postal)
router.get('/show-restaurant/:id', displayRestaurant) // Détails d'un restaurant

export { router as ShoppingRoute }