import { plainToClass } from "class-transformer"
import { NextFunction, Request, Response } from "express"
import { validate } from "class-validator";
import { CreateCustomerInputs, EditCustomerInputs, LoginCustomerInputs } from "../../dto";
import { generateOTP, generateSalt, generateSignature, hashPassword, onRequestOTP, validatePassword } from "../../utility";
import { Customer } from "../../models/Customer";

export const signUpCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerInputs = plainToClass(CreateCustomerInputs, req.body);
        const inputsErrors = await validate(customerInputs, { validationError: { target: true } });

        if (inputsErrors.length) {
            return res.status(400).json(inputsErrors);
        }

        const { email, phone, password } = customerInputs;
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);
        const { otp, otpExpiry } = generateOTP();

        const newCustomer = await Customer.create({
            email,
            phone,
            password: hashedPassword,
            salt,
            otp,
            otp_expiry: otpExpiry
        });

        if (newCustomer) {
            // Send OTP to customer's phone number
            // await onRequestOTP(otp, phone);

            // Generate JWT token
            const signature = generateSignature({
                id: newCustomer._id,
                email: newCustomer.email,
                verified: newCustomer.verified
            });

            // Send data to client
            return res.status(201).json({
                success: true,
                data: {
                    signature,
                    customer: newCustomer
                },
                error: null
            });
        }
    } catch (error) {
        next(error)
    }
}
export const loginCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginInputs = plainToClass(LoginCustomerInputs, req.body);
        const inputsErrors = await validate(loginInputs, { validationError: { target: true } });

        if (inputsErrors.length) {
            return res.status(400).json(inputsErrors);
        }

        const { email, password } = loginInputs;
        const customer = await Customer.findOne({ email });

        console.log(customer);


        if (customer) {
            const isPasswordValid = await validatePassword(password, customer.password, customer.salt);

            if (isPasswordValid) {
                const signature = generateSignature({
                    id: customer._id,
                    email: customer.email,
                    verified: customer.verified
                });

                return res.status(200).json({
                    success: true,
                    data: {
                        signature
                    },
                    error: null
                });
            }
        }

        return res.status(409).json({
            success: false,
            data: null,
            error: {
                message: "Invalid email or password"
            }
        });

    } catch (error) {
        next(error)
    }
}
export const verifyAccountCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { otp } = req.body;
        const customer = req.user;

        if (customer) {
            const profile = await Customer.findById(customer.id);
            if (profile) {
                if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                    profile.verified = true;
                    const updatedProfile = await profile.save();

                    const signature = generateSignature({
                        id: updatedProfile._id,
                        email: updatedProfile.email,
                        verified: updatedProfile.verified
                    });

                    return res.status(200).json({
                        success: true,
                        data: {
                            signature,
                            email: updatedProfile.email,
                            verified: updatedProfile.verified
                        },
                        error: null
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        data: null,
                        error: {
                            message: "OTP is invalid or expired"
                        }
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "Customer not found"
                    }
                });
            }
        }
    } catch (error) {
        next(error)
    }
}
export const getOtpCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;

        if (customer) {
            const profile = await Customer.findById(customer.id);

            if (profile) {
                const { otp, otpExpiry } = generateOTP();

                profile.otp = otp;
                profile.otp_expiry = otpExpiry;

                const updatedProfile = await profile.save();

                if (updatedProfile) {
                    // await onRequestOTP(otp, updatedProfile.phone);

                    return res.status(200).json({
                        success: true,
                        data: null,
                        error: null
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        data: null,
                        error: {
                            message: "OTP generation failed"
                        }
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "Customer not found"
                    }
                });
            }
        }
    } catch (error) {
        next(error)
    }
}
export const getProfileCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;

        if (customer) {
            const profile = await Customer.findById(customer.id);

            if (profile) {
                return res.status(200).json({
                    success: true,
                    data: profile,
                    error: null
                });
            } else {
                return res.status(400).json({
                    success: false,
                    data: null,
                    error: {
                        message: "Error fetching profile"
                    }
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Customer not found"
                }
            });
        }
    } catch (error) {
        next(error)
    }
}
export const updateProfileCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = req.user;
        const profileInputs = plainToClass(EditCustomerInputs, req.body);
        const inputsErrors = await validate(profileInputs, { validationError: { target: true } });

        if (inputsErrors.length) {
            return res.status(400).json(inputsErrors);
        }

        if (customer) {
            const profile = await Customer.findById(customer.id);

            if (profile) {
                const updatedProfile = await Customer.findByIdAndUpdate(profile._id, { $set: profileInputs }, { new: true});

                if (updatedProfile) {
                    return res.status(200).json({
                        success: true,
                        data: updatedProfile,
                        error: null
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        data: null,
                        error: {
                            message: "Error updating profile"
                        }
                    });
                }
            }
        } else {
            return res.status(400).json({
                success: false,
                data: null,
                error: {
                    message: "Customer not found"
                }
            });
        }
    } catch (error) {
        next(error)
    }
}