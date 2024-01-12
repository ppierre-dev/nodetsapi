import { NextFunction, Request, Response } from "express"
import { FoodDoc, Restaurant } from "../../models";

export const getRestaurantsAvailable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postalCode = req.params.postalcode;

        if (postalCode) {
            const availableRestaurant = await Restaurant
                .find({ postalCode, serviceAvailable: true })
                .sort([["rating", "descending"]])
                .populate("foods");

            if (availableRestaurant) {
                return res.status(200).json({
                    success: true,
                    data: availableRestaurant,
                    error: null
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Postal code is required"
                }
            });
        }
    } catch (error) {
        next(error)
    }
}
export const getTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postalCode = req.params.postalcode;
        const quantity = req.params.quantity || 10;

        if (postalCode && quantity) {
            const topRestaurants = await Restaurant
                .find({ postalCode, serviceAvailable: true })
                .sort([["rating", "descending"]])
                .limit(Number(quantity))
                .populate("foods");

            if (topRestaurants) {
                return res.status(200).json({
                    success: true,
                    data: topRestaurants,
                    error: null
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Postal code and quantity are required"
                }
            });
        }
    } catch (error) {
        next(error)
    }
}
export const getFoodsIn30Mins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postalCode = req.params.postalcode;

        if (postalCode) {
            const restaurants = await Restaurant
                .find({ postalCode, serviceAvailable: true })
                .populate("foods");

            if (restaurants.length) {
                const foodsIn30Mins: any = [];

                restaurants.map((restaurant) => {
                    const foods = restaurant.foods as [FoodDoc]

                    foodsIn30Mins.push(...foods.filter((food => food.readyTime <= 30)));
                })

                return res.status(200).json({
                    success: true,
                    data: foodsIn30Mins,
                    error: null
                });
            } else {
                return res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "No restaurant found"
                    }
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Postal code is required"
                }
            });
        }

    } catch (error) {
        next(error)
    }
}
export const searchFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postalCode = req.params.postalcode;

        if (postalCode) {
            const restaurants = await Restaurant
                .find({ postalCode, serviceAvailable: true })
                .populate("foods");

            if (restaurants.length) {
                let foodsResult: any = [];

                restaurants.map((restaurant) => {
                    foodsResult.push(...restaurant.foods);
                })

                return res.status(200).json({
                    success: true,
                    data: foodsResult,
                    error: null
                });
            } else {
                return res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "No restaurant found"
                    }
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Postal code is required"
                }
            });
        }
    } catch (error) {
        next(error)
    }
}
export const displayRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate("foods");

        if (restaurant) {
            return res.status(200).json({
                success: true,
                data: restaurant,
                error: null
            });
        } else {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Restaurant not found"
                }
            });
        }
    } catch (error) {
        next(error)
    }
}