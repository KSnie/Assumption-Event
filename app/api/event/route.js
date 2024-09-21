import Myevent from "@/models/Myevent";

export async function GET(request) {
    try {
        // Fetch all events from the database
        
        const events = await Myevent.find();

        // Check if events are found
        if (events.length === 0) {
            return new Response(JSON.stringify({ message: "No events found" }), {
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
