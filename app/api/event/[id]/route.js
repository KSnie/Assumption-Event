import Myevent from "@/models/Myevent";

export async function GET(request, { params }) {
  const { id } = params; // Extract the ID from dynamic route params

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
  }

  try {
    const event = await Myevent.findById(id);
  
    if (!event) {
      return new Response(JSON.stringify({ error: "Event not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
