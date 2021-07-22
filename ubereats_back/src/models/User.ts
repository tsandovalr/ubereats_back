import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    number: {
		type: Number,
		required: true
	},
    role: {
		type: String,
		default: "user",
		enum: ["user", "admin"]
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 64
    }
});
export default model('User', userSchema);