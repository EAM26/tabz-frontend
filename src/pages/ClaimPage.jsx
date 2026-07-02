import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function ClaimPage() {
    const { tabId } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleClaim = async (claim) => {
        setMessage("");
        setError("");
        try {
            const response = await api.post(`/api/tab/claim/${tabId}`, {
                isClaimed: claim,
            });
            setMessage(response.data);
            setTimeout(() => {
                navigate("/user");
            }, 2000);
        } catch (err) {
            console.log(err);
            if(err.response?.status ===409) {
                setError("Tab is already claimed.")
                setTimeout(() => {
                    navigate("/user");
                }, 2000);
                return;
            }
            setError("Something went wrong.");
            setTimeout(() => {
                navigate("/me");
            }, 2000);
            return;
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", textAlign: "center" }}>
            <h2>Tab #{tabId}</h2>
            <p>Wil je deze bon claimen?</p>
            <button
                onClick={() => handleClaim(true)}
                style={{ padding: "12px 30px", marginRight: "20px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                Claimen
            </button>
            <button
                onClick={() => handleClaim(false)}
                style={{ padding: "12px 30px", background: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                Niet claimen
            </button>
            {message && <p style={{ color: "green", marginTop: "20px" }}>{message}</p>}
            {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
        </div>
    );
}

export default ClaimPage;