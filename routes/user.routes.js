import {Router} from "express";
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// get users
// -> /api/v1/users
userRouter.get("/", getUsers);

// get /users/:id
userRouter.get("/:id", authorize, getUser);

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