import express from 'express';
import {NODE_ENV, PORT} from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import workflowRouter from "./routes/workflow.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// /api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);


app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    // res.render('index');
    res.send('welcome to the booking API');
})

app.listen(PORT, async () => {
    console.log(`API is running on http://localhost:${ PORT }`);

    await connectToDatabase();
    console.log(`Connected to the database in ${NODE_ENV} mode`);
})

export default app;