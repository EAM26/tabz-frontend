import {useState} from "react";



function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const loginRequest = {
            username: username,
            password: password,
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
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>
                    <button className="bg-tabz-dark px-6 text-white" type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;