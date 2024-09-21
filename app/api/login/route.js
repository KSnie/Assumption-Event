import User from "@/models/User";

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return new Response(JSON.stringify({ error: "Invalid username or password" }), {
                status: 401,
            });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: "Invalid username or password" }), {
                status: 401,
            });
        }

        // Authentication successful
        return new Response(JSON.stringify({ message: "Login successful!" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Login failed", details: error.message }),
            { status: 500 }
        );
    }
}
