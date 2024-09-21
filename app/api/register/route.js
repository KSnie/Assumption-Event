import User from "@/models/User";
// import connectDB from "@/middleware/instrumentation";

// Connect to database
// connectDB();

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, password } = body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Create a new user with a temporary Owner_id
    const newUser = new User({ username, password, Owner_id: "null" });
    await newUser.save();

    // Set Owner_id to the new user's _id and save it
    newUser.Owner_id = newUser._id.toString(); // Update Owner_id
    await newUser.save(); // Save the updated user

    // Return the newly created user (or success message)
    return new Response(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Registration failed", details: error.message }),
      { status: 500 }
    );
  }
}
