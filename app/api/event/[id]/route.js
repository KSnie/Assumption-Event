import Myevent from "@/models/Myevent";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Extract the ID from query parameters

  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
  }

  const event = await Myevent.findById(id);
  
  if (!event) {
    return new Response(JSON.stringify({ error: "Event not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(event), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
