"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconEye, IconEyeOff, IconLoader2 } from "@tabler/icons-react";

export default function SignInPage() {
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("qwerty");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (email === "admin@example.com" && password === "qwerty") {
                // Set authentication cookie/token
                document.cookie = "auth-token=authenticated; path=/; max-age=86400"; // 24 hours

                // Redirect to dashboard
                router.push("/dashboard/customers");
            } else {
                setError("Invalid email or password");
            }
        } catch {
            setError("An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-950 to-gray-920 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Access your dashboard</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    defaultValue="admin@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="mt-1 relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        defaultValue="qwerty"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <IconEyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <IconEye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-lime-400 text-black hover:bg-lime-500"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">Demo credentials: admin@example.com / qwerty</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
