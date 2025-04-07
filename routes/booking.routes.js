import {Router} from "express";

const bookingRouter = Router();

bookingRouter.get("/", (req, res) => {
    res.send({title: "get all bookings"});
})

bookingRouter.get("/:id", (req, res) => {
    res.send({title: "get bookings details"});
})

bookingRouter.post("/", (req, res) => {
    res.send({title: "creat booking"});
})

bookingRouter.put("/:id", (req, res) => {
    res.send({title: "update booking"});
})

bookingRouter.delete("/:id", (req, res) => {
    res.send({title: "delete booking"});
})

bookingRouter.get("/user/:id", (req, res) => {
    res.send({title: "Get all user bookings"});
})

bookingRouter.put("/:id/cancel", (req, res) => {
    res.send({title: "cancel bookings"});
})

bookingRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "Get upcoming renewals"});
})


export default bookingRouter;