import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createBooking, getUserBookings} from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.get("/", (req, res) => {
    res.send({title: "get all bookings"});
})

bookingRouter.get("/:id", (req, res) => {
    res.send({title: "get bookings details"});
})

bookingRouter.post("/", authorize, createBooking)

bookingRouter.put("/:id", (req, res) => {
    res.send({title: "update booking"});
})

bookingRouter.delete("/:id", (req, res) => {
    res.send({title: "delete booking"});
})

bookingRouter.get("/user/:id", authorize, getUserBookings)

bookingRouter.put("/:id/cancel", (req, res) => {
    res.send({title: "cancel bookings"});
})

bookingRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "Get upcoming renewals"});
})


export default bookingRouter;