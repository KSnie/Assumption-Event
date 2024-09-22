import Myattendee from "@/models/Myattendee";
import Myticket from "@/models/Mytickets";

export async function POST(request) {
    try {
        const body = await request.json();

        const newAttendee = new Myattendee({
            ...body,
            Attendee_id: "none"
        });
        await newAttendee.save();

        newAttendee.Attendee_id = newAttendee._id.toString();
        await newAttendee.save();
        
        // console.log(newAttendee);

        return new Response(JSON.stringify({ message: "Attendee created successfully" }), {
            status: 201,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Attendee creation failed", details: error.message }),
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

        const attendees = await Myattendee.find({ Event_id: id });

        
        // Check if attendees are found
        if (attendees.length === 0) {
            return new Response(JSON.stringify({ message: "Not Found" }), {
                status: 404,
            });
        }

        const attendeesWithTickets = await Promise.all(
            attendees.map(async (attendee) => {
                const ticket = await Myticket.findById(attendee.Tickets_ID);
                return {
                    ...attendee, // Spread the attendee data
                    ticket, // Add the ticket data
                };
            })
        );

        // console.log(attendeesWithTickets);

        return new Response(JSON.stringify(attendeesWithTickets), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch attendees", details: error.message }),
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, ...updatedData } = body; // Extract id and the rest of the data
        // // console.log(body);
        // Find the Myattendee by ID and update it
        const ticket = await Myattendee.findByIdAndUpdate(id, updatedData, { new: true });

        if (!ticket) {
            return new Response(
                JSON.stringify({ error: "Myattendee not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(ticket), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to update Myattendee", details: error.message }),
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body; // Extract id

        // Find the Myattendee by ID and delete it
        const ticket = await Myattendee.findByIdAndDelete(id);
        const ticket2 = await Myticket.findByIdAndDelete(ticket.Tickets_ID);

        if (!ticket) {
            return new Response(
                JSON.stringify({ error: "Myattendee not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify({ message: "Myattendee deleted successfully" }), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to delete Myattendee", details: error.message }),
            { status: 500 }
        );
    }
}