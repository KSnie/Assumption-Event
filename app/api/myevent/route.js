import Myevent from "@/models/Myevent";

export async function POST(request) {
    try {
        const body = await request.json();
        const id = body.Owner_id;

        const eventData = {
            ...body,
            Owner_id: id, // Use Owner_id from session
        };

        await Myevent.create(eventData);
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


async function DELETE(request) {
    try {
        const session = await getSession({ req });
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        const { id } = request.params;
        const event = await Myevent.findOne({ _id: id });
        if (!event) {
            return new Response(JSON.stringify({ error: "Event not found" }), {
                status: 404,
            });
        }

        if (event.Owner_id !== session.user.id) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
        }

        await Myevent.deleteOne({ _id: id });
        return new Response(JSON.stringify({ message: "Event deleted successfully" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Event deletion failed", details: error.message }),
            { status: 500 }
        );
    }
}