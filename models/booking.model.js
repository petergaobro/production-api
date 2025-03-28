import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Booking is required"],
        trim: true,
        minlength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Booking price is required"],
        min: [0, 'Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    // renewalDate: {
    //     type: Date,
    //     required: true,
    //     validate: {
    //         validator: function (value) {
    //             return value > this.startDate;
    //         },
    //         message: 'Renewal date must be after the start date',
    //     }
    // },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Ensure both dates exist and are valid
                return this.startDate && value > this.startDate;
            },
            message: 'Renewal date must be after the start date',
        },
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {timestamps: true});


// auto-calculate renewal data is missing
bookingSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        // Jan 1st
        // Monthly
        // 30 days
        // Jan 31st

        const daysToAdd = renewalPeriods[this.frequency];

        if (daysToAdd) {
            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setDate(this.renewalDate.getDate() + daysToAdd);
        }
    }

    // Auto-update the status if renewal date has passed
    if (this.renewalDate && this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});


const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;