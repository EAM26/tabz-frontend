import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import UserPage from "./components/UserPage.jsx";
import NavBarApp from "./components/NavBarApp.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <BrowserRouter>
            <div className="flex min-h-screen flex-col">
                <NavBarApp />

                <main className="flex-1">
                    <Routes>
                        {/*
                            Route voor "/":
                            Ingelogd?  → ga naar /user
                            Niet ingelogd? → ga naar /login
                        */}
                        <Route
                            path="/"
                            element={
                                <Navigate to={isLoggedIn ? "/user" : "/login"} replace />
                            }
                        />

                        {/* Loginpagina — alleen zichtbaar als NIET ingelogd */}
                        <Route
                            path="/login"
                            element={
                                isLoggedIn
                                    ? <Navigate to="/user" replace />
                                    : <Login />
                            }
                        />

                        {/* Beveiligde pagina — alleen zichtbaar als WEL ingelogd */}
                        <Route
                            path="/user"
                            element={
                                <ProtectedRoute>
                                    <UserPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;