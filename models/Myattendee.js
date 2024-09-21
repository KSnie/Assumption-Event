import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
    Event_id: {
        type: String,
        required: true
    },
    Attendee_id: {
        type: String,
        required: true
    },
    Tickets_ID : {
        type: String,
        required: true
    },
    Status : {
        type: String,
        required: true
    }
});

const Myattendee = mongoose.models.Myattendee || mongoose.model("Myattendee", attendeeSchema);

export default Myattendee;