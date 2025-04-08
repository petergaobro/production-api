import Booking from "../models/booking.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createBooking = async (req, res, next) => {
    try {
        const booking = await Booking.create({
            // entire request body
            ...req.body,
            user: req.user._id,
        })

        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/booking/reminder`,
            body: {
                bookingId: booking.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({success: true, data: {booking, workflowRunId}});
    } catch (error) {
        next(error)
    }
}

export const getUserBookings = async (req, res, next) => {
    try {
        // check if the user is the same as the one in the token
        if (req.user.id !== req.params.id) {
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
    } catch (error) {
        next(error)
    }
}