function UserPage() {
    return (
        <div>
            <div className="flex">
                <h2>Hello Jan!</h2>
                <img src="/clapping.svg" alt="clapping logo"/>
            </div>
            <h4>This is your overview</h4>

            <card>
                <div>
                    <img src="/user-gr.svg" alt="user logo"/>
                    <h5>Your details</h5>
                </div>
                <div>
                    <p>Username</p>
                    <p>Jan</p>

                    <p>E-mail address</p>
                    <p>jan@gmail.com</p>
                </div>
            </card>

            <card>
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

            </card>
        </div>

    );
}

export default UserPage;