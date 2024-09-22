import Myticket from "@/models/Mytickets";
import Myattendee from "@/models/Myattendee";
import Myevent from "@/models/Myevent";

function generateRandomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let result = '';

    // Generate 3 random uppercase letters
    for (let i = 0; i < 3; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generate 3 random numbers
    for (let i = 0; i < 3; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return result;
}

export async function POST(request) {
    try {
        const body = await request.json();

        const newTicket = new Myticket({
            ...body,
            T_ID: "none",
            Attendee_id: "none",
            Event_id: body.Event,
            Onwer_id: body.Owner,
            Code: generateRandomCode(6), // Random 6-letter code
            Amount: "1",
        });
        // console.log("Request Bodyxx:", newTicket);
        await newTicket.save();

        // // Update T_ID after saving the ticket
        newTicket.T_ID = newTicket._id.toString();
        await newTicket.save();
        const newAttendee = new Myattendee({
            Event_id: newTicket.Event_id,
            Attendee_id: "none",
            Tickets_ID: newTicket._id.toString(),
            Status: "REGISTERED",
        });

        await newAttendee.save();

        // Update Attendee_id after saving the attendee
        newAttendee.Attendee_id = newAttendee._id.toString();
        await newAttendee.save();

        // Update the ticket's Attendee_id
        newTicket.Attendee_id = newAttendee.Attendee_id;
        await newTicket.save();

        return new Response(JSON.stringify({ message: "Ticket created successfully" }), {
            status: 201,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Ticket creation failed", details: error.message }),
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        // Use URLSearchParams to extract query parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("id"); // Assuming you're sending the id as a query parameter

        // Validate the id
        if (!id) {
            return new Response(
                JSON.stringify({ error: "ID parameter is required" }),
                { status: 400 }
            );
        }

        // Fetch tickets by Owner_id
        const tickets = await Myticket.find({ Onwer_id: id });

        // Check if tickets are found
        if (tickets.length === 0) {
            return new Response(JSON.stringify({ message: "Not Found" }), {
                status: 404,
            });
        }

        // Extract Event_ids from tickets to fetch event details
        const eventIds = tickets?.map(ticket => ticket.Event_id);

        const events = await Myevent.find({ Event_id: { $in: eventIds } });
        // Fetch attendees related to the tickets
        const attendeeIds = tickets?.map(ticket => ticket.T_ID);
        const attendees = await Myattendee.find({ Tickets_ID: { $in: attendeeIds } });

        // Merge event and attendee data into each ticket
        const ticketsWithDetails = tickets?.map(ticket => {
            const event = events.find(evt => evt.Event_id === ticket.Event_id);
            const attendee = attendees.find(att => att.Tickets_ID === ticket.T_ID);
            
            return {
                ...ticket.toObject(),
                EventDetails: event, // Merging event details
                Status: attendee ? attendee.Status : "No Status" // Optional chaining
            };
        });

        // console.log("Tickets with details:", ticketsWithDetails);
        return new Response(JSON.stringify(ticketsWithDetails), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch tickets", details: error.message }),
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, ...updatedData } = body; // Extract id and the rest of the data
        
        // Find the ticket by ID and update it
        const ticket = await Myticket.findByIdAndUpdate(id, updatedData, { new: true });

        if (!ticket) {
            return new Response(
                JSON.stringify({ error: "Ticket not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(ticket), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to update ticket", details: error.message }),
            { status: 500 }
        );
    }
}




