import {useEffect, useState} from "react";
import api from "../services/api.js";

function UserPage() {

    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {

        async function loadUser() {
            try {
                const response = await api.get("/api/user/me");
                setUserName(response.data.username);
                console.log(response.data);
                console.log(userName);


            } catch (e) {
                setError("Something went wrong.");
                console.error(e);
            }
            console.log("use effect triggered");



        }

        loadUser();

    }, [])
    return (
        <div>
            <div className="flex">
                <h2>Hello {userName}!</h2>
                <img src="/clapping.svg" alt="clapping logo"/>
            </div>
            <h4>This is your overview</h4>

            <section>
                <div>
                    <img src="/user-gr.svg" alt="user logo"/>
                    <h5>Your details</h5>
                </div>
                <div>
                    <p>Username</p>
                    <p>{userName}</p>

                    <p>E-mail address</p>
                    <p>jan@gmail.com</p>
                </div>
            </section>

            <section>
                <div>
                    <img src="/chart.svg" alt="chart logo"/>
                    <h5>Your tabs</h5>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Shop</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Hema</td>
                        <td>€ 45.25</td>
                        <td>24-06-2026</td>
                        <td><img src="/dots-vert.svg" alt="vertical dots"/></td>
                    </tr>
                    <tr>
                        <td>Hema</td>
                        <td>€ 45.25</td>
                        <td>24-06-2026</td>
                        <td><img src="/dots-vert.svg" alt="vertical dots"/></td>
                    </tr>
                    <tr>
                        <td>Hema</td>
                        <td>€ 45.25</td>
                        <td>24-06-2026</td>
                        <td><img src="/dots-vert.svg" alt="vertical dots"/></td>
                    </tr>
                    </tbody>
                </table>

            </section>
        </div>

    );
}

export default UserPage;