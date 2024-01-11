import { Request, Response, NextFunction } from 'express';
import { CreateFoodInputs, EditRestaurantInputs, LoginRestaurantInputs } from '../../dto';
import { findRestaurant } from '.';
import { generateSignature, validatePassword } from '../../utility';
import { Restaurant, Food } from '../../models';

export const restaurantLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = <LoginRestaurantInputs>req.body;
        const restaurant = await findRestaurant(undefined, email);

        if (restaurant) {
            const isPasswordValid = await validatePassword(password, restaurant.password, restaurant.salt);

            if (isPasswordValid) {
                const signature = generateSignature({
                    id: restaurant._id,
                    email: restaurant.email,
                    name: restaurant.name,
                    foodTypes: restaurant.foodTypes
                });

                return res.status(200).json({
                    success: true,
                    data: signature,
                    error: null
                });
            } else {
                return res.status(401).json({
                    success: false,
                    data: null,
                    error: {
                        message: "Invalid credentials"
                    }
                });
            }
        }

        return res.status(401).json({
            success: false,
            data: null,
            error: {
                message: "Invalid credentials"
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (user) {
            const restaurant = await findRestaurant(user.id);
            if (restaurant) {
                return res.status(200).json({
                    success: true,
                    data: restaurant,
                    error: null
                });
            }

            return res.status(404).json({
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
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        const body = <EditRestaurantInputs>req.body;

        if (user) {
            const updatedRestaurant = await Restaurant.findByIdAndUpdate(user.id, {$set: body}, {new: true});
            if (updatedRestaurant) {
                return res.status(200).json({
                    success: true,
                    data: updatedRestaurant,
                    error: null
                });
            }
        }
    } catch (error) {
        next(error)
    }
}
export const updateServiceAvailable = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (user) {
            const restaurant = await findRestaurant(user.id);            

            if (restaurant) {
                restaurant.serviceAvailable = !restaurant.serviceAvailable;
                const updatedRestaurant = await restaurant.save();

                if (updatedRestaurant) {
                    return res.status(200).json({
                        success: true,
                        data: updatedRestaurant,
                        error: null
                    });
                }
            }
            
        }
    } catch (error) {
        next(error);
    }
}

export const createFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        
        if (user) {
            const body = <CreateFoodInputs>req.body;
            const restaurant = await findRestaurant(user.id);

            if (restaurant) {
                const createdFood = await Food.create({...body, restaurantId: restaurant._id});
                restaurant.foods.push(createdFood._id);
                await restaurant.save();

                if (createdFood) {
                    return res.status(201).json({
                        success: true,
                        data: createdFood,
                        error: null
                    });
                }
            }
        }
    } catch (error) {
        next(error);
    }
}

export const getFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (user) {
            const restaurant = await findRestaurant(user.id);

            if (restaurant) {
                return res.status(200).json({
                    success: true,
                    data: restaurant.foods,
                    error: null
                });
            }
        }
    } catch (error) {
        next(error);
    }
}
