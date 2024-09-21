import Myticket from "@/models/Mytickets";

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

        const tickets = await Myticket.find({ Onwer_id: id });

        // Check if tickets are found
        if (tickets.length === 0) {
            return new Response(JSON.stringify({ message: "Not Found" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(tickets), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch tickets", details: error.message }),
            { status: 500 }
        );
    }
}