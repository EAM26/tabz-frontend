import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from;
    const redirectTo = from ? `${from.pathname}${from.search ?? ""}` : "/user";

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        const registerRequest = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const response = await api.post("/api/auth/register", registerRequest);

            login(response.data.token);

            navigate(redirectTo, { replace: true });
        } catch (error) {
            if (error.response?.status === 400) {
                setError("Please check your registration details.");
                return;
            }

            if (error.response?.status === 409) {
                setError("Username or email already exists.");
                return;
            }

            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <section className="bg-tabz-background px-6 py-10 font-poppins text-tabz-text md:py-16">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_480px] lg:items-center">
                <div className="mx-auto max-w-xl lg:mx-0">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Create account
                    </h1>

                    <p className="mt-4 max-w-md text-xl leading-relaxed text-tabz-muted md:text-2xl">
                        Register to claim and manage your tabs.
                    </p>

                    <img
                        className="mx-auto mt-10 w-full max-w-md lg:mx-0"
                        src="/tabz-dashboard-illustration.svg"
                        alt="Dashboard illustration"
                    />
                </div>

                <div className="rounded-3xl bg-tabz-surface p-6 shadow-[0_18px_45px_rgba(21,71,44,0.12)] ring-1 ring-tabz-border md:p-8">
                    <h2 className="text-3xl font-bold text-tabz-text">
                        Register
                    </h2>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-semibold text-tabz-text"
                                htmlFor="username"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Enter your username"
                                autoComplete="username"
                                className="h-14 w-full rounded-xl border border-tabz-border bg-white px-4 text-base text-tabz-text outline-none placeholder:text-tabz-placeholder focus:border-tabz-primary focus:ring-4 focus:ring-tabz-primary/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                className="text-sm font-semibold text-tabz-text"
                                htmlFor="email"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Enter your email"
                                autoComplete="email"
                                className="h-14 w-full rounded-xl border border-tabz-border bg-white px-4 text-base text-tabz-text outline-none placeholder:text-tabz-placeholder focus:border-tabz-primary focus:ring-4 focus:ring-tabz-primary/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                className="text-sm font-semibold text-tabz-text"
                                htmlFor="password"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                                autoComplete="new-password"
                                className="h-14 w-full rounded-xl border border-tabz-border bg-white px-4 text-base text-tabz-text outline-none placeholder:text-tabz-placeholder focus:border-tabz-primary focus:ring-4 focus:ring-tabz-primary/10"
                            />
                        </div>

                        {error && (
                            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {error}
                            </p>
                        )}

                        <button
                            className="h-14 w-full rounded-xl bg-tabz-dark px-6 text-base font-semibold text-white shadow-[0_10px_20px_rgba(21,71,44,0.25)] transition-colors hover:bg-tabz-dark-hover"
                            type="submit"
                        >
                            Register
                        </button>

                        <p className="text-center text-sm text-tabz-text">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                state={{ from: from }}
                                className="font-semibold text-tabz-link hover:text-tabz-dark-hover"
                            >
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;