import dayjs from "dayjs";
import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express')

import Booking from "../models/booking.model.js";

const REMINDERS = [7, 5, 2, 1]


export const sendReminders = serve(async (context) => {
    const {bookingId} = context.requestPayload;
    const booking = await fetchBooking(context, bookingId)

    if (!booking || booking.status !== "active") return;

    const renewalDate = dayjs(booking.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for booking ${bookingId}. Stopping workflow.`);

    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        // renewal date = 22 Feb, reminder date = 15 feb, 17,20,21
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);

        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`)
    }
})

const fetchBooking = async (context, bookingId) => {
    return await context.run('get booking', async () => {
        return Booking.findById(bookingId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // send email, SMS, push notification ...
    })
}