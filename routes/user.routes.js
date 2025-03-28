import {Router} from "express";
import app from "../app.js";

const userRouter = Router();

// get users

userRouter.get("/users", (req, res) =>
    res.send({title: "Get all users"})
);

// get /users/:id
userRouter.get("/:id", (req, res) =>
    res.send({title: "Get users details"})
);

// create new user
userRouter.post("/", (req, res) =>
    res.send({title: "create a new user"})
);

// update user
userRouter.put("/:id", (req, res) =>
    res.send({title: "update a user"})
);

// delete user
userRouter.delete("/:id", (req, res) =>
    res.send({title: "delete user"})
);

export default userRouter;