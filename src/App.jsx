import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import UserPage from "./pages/UserPage.jsx";
import NavBarApp from "./components/NavBarApp.jsx";
import Footer from "./components/Footer.jsx";
import ClaimPage from "./pages/ClaimPage.jsx";

function App() {
    const { isLoggedIn } = useAuth();

    return (
        <BrowserRouter>
            <div className="flex min-h-screen flex-col">
                <NavBarApp />

                <main className="flex-1">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Navigate to={isLoggedIn ? "/user" : "/login"} replace />
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                isLoggedIn
                                    ? <Navigate to="/user" replace />
                                    : <Login />
                            }
                        />

                        <Route
                            path="/user"
                            element={
                                <ProtectedRoute>
                                    <UserPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/claim/:tabId"
                            element={
                                <ProtectedRoute>
                                    <ClaimPage />
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