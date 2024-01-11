export interface CreateRestaurantInputs {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface LoginRestaurantInputs {
    email: string;
    password: string;
}

export interface RestaurantPayload {
    id: string;
    email: string;
    name: string;
    foodTypes: [string];
}

export interface EditRestaurantInputs {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalCode: string;
    address: string;
    phone: string;
}