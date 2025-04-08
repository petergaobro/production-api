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
    renewalDate: {
        type: Date,
        required: true,
        default: function () {
            const renewalPeriods = {
                daily: 1,
                weekly: 7,
                monthly: 30,
                yearly: 365,
            };

            const daysToAdd = renewalPeriods[this.frequency] || 30;
            const base = new Date(this.startDate || new Date());
            return new Date(base.setDate(base.getDate() + daysToAdd));
        },
        validate: {
            validator: function (value) {
                // Ensure both dates exist and are valid
                // return this.startDate && value > this.startDate;
                // return value > this.startDate;
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

        const daysToAdd = renewalPeriods[this.frequency];

        // ✅ Check if frequency is valid
        if (!daysToAdd) {
            return next(new Error('Invalid or missing frequency for automatic renewal date.'));
        }

        // ✅ Safe calculation: add days in milliseconds to avoid date overflow issues
        const start = new Date(this.startDate);
        const renewal = new Date(start.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // 加天数（毫秒）

        this.renewalDate = renewal;
    }

    // ✅ If the renewal date is already in the past, mark the status as expired
    if (this.renewalDate && this.renewalDate.getTime() < Date.now()) {
        this.status = 'expired';
    }
    next();
});


const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;