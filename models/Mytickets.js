import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    T_ID: {
        type: String,
        required: true
    },
    Attendee_id: {
        type: String,
        required: true
    },
    Onwer_id: {
        type: String,
        required: true
    },
    Event_id: {
        type: String,
        required: true
    },
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    Phonenumber: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Faculty: {
        type: String,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
});

const Myticket = mongoose.models.Myticket || mongoose.model("Myticket", ticketSchema);

export default Myticket;
