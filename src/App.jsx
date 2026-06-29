import UserPage from "./components/UserPage.jsx";
import NavBarApp from "./components/NavBarApp.jsx";
import Footer from "./components/Footer.jsx";
import {useState} from "react";
import Login from "./components/Login.jsx";

function App() {
    const [login, setLogin] = useState(false);
    if(!login) {
        return (
            <div  className="flex min-h-screen flex-col">
                <NavBarApp/>
                <main className="flex-1">
                    <Login/>
                </main>
                <Footer/>
            </div>
        );
    }
    else {
        return (
            <div  className="flex min-h-screen flex-col">
                <NavBarApp/>
                <main className="flex-1">
                    <UserPage/>
                </main>
                <Footer/>
            </div>
        );
    }


}

export default App;