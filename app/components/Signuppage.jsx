"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Label, TextInput } from "flowbite-react";

export default function Signuppage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        // Send a POST request to your API endpoint for user registration
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("Registration successful!");
            router.push("/signin");
        } else {
            setMessage(`Error: ${data.error}`);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-96 mt-10 sm:mr-0 mr-5">
                <Card>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Username1" value="Username" />
                            </div>
                            <TextInput
                                id="Username1"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Password" />
                            </div>
                            <TextInput
                                id="password1"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="Confirm Password" />
                            </div>
                            <TextInput
                                id="password2"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {message && <p className="text-red-500">{message}</p>}
                        <div className="flex text-sm">
                            <h1>Already have an account?</h1>
                            <a href="/signin" className="underline ml-2">Sign in</a>
                        </div>
                        <Button type="submit" className="bg-customRed mt-4">SIGN UP</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
