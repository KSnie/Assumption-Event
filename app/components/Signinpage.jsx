"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signinpage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (result.error) {
            setMessage(`Error: ${result.error}`);
        } else {
            setMessage("Login successful!");
            router.push("/home");
        }
    };

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="w-96 mt-10 sm:mr-0">
                <Card>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Username1" value="Username" />
                            </div>
                            <TextInput
                                id="Username1"
                                type="text"
                                placeholder=""
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
                        {message && <p>{message}</p>}
                        <div className="flex text-sm">
                            <h1>Didn't have an account?</h1>
                            <a href="/signup" className="underline ml-2">Signup</a>
                        </div>
                        <Button type="submit" className="bg-customRed mt-4">SIGN IN</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
