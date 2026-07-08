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
        <div className="bg-tabz-background px-6">
            <h1>Create account</h1>
            <p>Register to claim and manage your tabs</p>

            <img
                className="h-36"
                src="/tabz-dashboard-illustration.svg"
                alt="main-logo"
            />

            <div className="bg-white">
                <h3 className="text-[#15472c]">Register</h3>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Enter your username"
                            autoComplete="username"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            autoComplete="new-password"
                        />
                    </div>

                    {error && <p className="text-red-600">{error}</p>}

                    <button className="bg-tabz-dark px-6 text-white" type="submit">
                        Register
                    </button>

                    <p className="mt-4 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            state={{ from: from }}
                            className="font-semibold text-tabz-dark"
                        >
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;