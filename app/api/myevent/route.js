import Myevent from "@/models/Myevent";

export async function POST(request) {
    try {
        const body = await request.json();

        const newEvent = new Myevent({
            ...body,
            Event_id: "none"
        });
        await newEvent.save();

        newEvent.Event_id = newEvent._id.toString();
        await newEvent.save();
        
        console.log(newEvent);

        return new Response(JSON.stringify({ message: "Event created successfully" }), {
            status: 201,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Event creation failed", details: error.message }),
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

        const events = await Myevent.find({ Owner_id: id });

        // Check if events are found
        if (events.length === 0) {
            return new Response(JSON.stringify({ message: "Not Found" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(events), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch events", details: error.message }),
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, ...updatedData } = body; // Extract id and the rest of the data

        // Find the event by ID and update it
        const event = await Myevent.findByIdAndUpdate(id, updatedData, { new: true });

        if (!event) {
            return new Response(
                JSON.stringify({ error: "Event not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify({ message: "Event updated successfully", event }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Event update failed", details: error.message }),
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    try {
        const body = await request.json();
        console.log(body);

        const deletedEvent = await Myevent.findByIdAndDelete(body._id);

        return new Response(JSON.stringify({ message: "Event DELETE successfully" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Event DELETE failed", details: error.message }),
            { status: 500 }
        );
    }
}