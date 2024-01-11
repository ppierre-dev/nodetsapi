import { Request, Response, NextFunction } from "express";
import { CreateRestaurantInputs } from "../dto";
import { Restaurant } from "../models";
import { generateSalt, hashPassword } from "../utility";

export const findRestaurant = async(id: string | undefined, email?: string) => {
    return email ? Restaurant.findOne({email}).exec() : Restaurant.findById(id).exec();
}

export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = <CreateRestaurantInputs>req.body;

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(body.password, salt);

        const newRestaurant = new Restaurant({ ...body, salt: salt, password: hashedPassword });
        const result = await newRestaurant.save();

        return res.status(201).json({
            success: true,
            data: result,
            error: null
        });
    } catch (error) {
        next(error);
    }
};

export const getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurants = await Restaurant.find({});

        if (restaurants.length) {
            return res.status(200).json({
                success: true,
                data: restaurants,
                error: null
            });
        } else {
            return res.status(404).json({
                success: false,
                data: null,
                error: {
                    message: "No restaurants found"
                }
            });
        }
    } catch (error) {
        next(error);
    }
}

export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findById(id);

        if (restaurant) {
            return res.status(200).json({
                success: true,
                data: restaurant,
                error: null
            });
        } else {
            return res.status(404).json({
                success: false,
                data: null,
                error: {
                    message: "No restaurant found with the given id"
                }
            });
        }
    } catch (error) {
        if ((error as any).name === "CastError") {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Invalid restaurant id"
                }
            });
        }

        next(error);
    }
}