import Booking from "../models/booking.model.js";

export const createBooking = async (req, res, next) => {
    try {
        const booking = await Booking.create({
            // entire request body
            ...req.body,
            user: req.user._id,
        })

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        next(error)
    }
}

export const getUserBookings = async (req, res, next) => {
    try {
        // check if the user is the same as the one in the token
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const bookings = await Booking.find({
            user: req.user._id,
        })
        res.status(200).json({
            success: true,
            data: bookings
        })
    } catch(error) {
        next(error)
    }
}