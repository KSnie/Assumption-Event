import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    maxjoin: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    Event_id: {
        type: String,
        required: true
    },
    Owner_id: {
        type: String,
        required: true
    }
});

// Ensure you're using the same model name consistently
const Myevent = mongoose.models.Myevent || mongoose.model("Myevent", eventSchema);

export default Myevent;
