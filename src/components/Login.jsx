import {useState} from "react";
import api from "../services/api.js";



function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setMessage("");

        const loginRequest = {
            username: username,
            password: password,
        };

        try {
            const response = await api.post("http://localhost:8080/api/auth/authenticate", loginRequest);
            localStorage.setItem("token", response.data.token);
            setMessage("Login successfull");
        } catch (error) {
            if(error.response?.status ===401) {
                setError("Invalid username or password");
                return;
            }
            setError("Something went wrong. Please try again.")
        }

        console.log("username: " + username);
        console.log("password: " + password);
    }

    return (
        <div className="bg-tabz-background px-6">
            <h1>Welcome</h1>
            <p>Log in for access</p>
            <img className="h-36" src="/tabz-dashboard-illustration.svg" alt="main-logo"/>
            <div className="bg-white ">
                <h3 className="text-[#15472c]">Log in</h3>
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
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    {message && <p className="text-green-700">{message}</p>}
                    <button className="bg-tabz-dark px-6 text-white" type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;