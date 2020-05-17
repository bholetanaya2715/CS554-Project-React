import { Line } from 'react-chartjs-2'
import React, { useContext } from 'react';
import "../App.css";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";
import axios from "axios";
const FoodHistory = () => {

    const { currentUser } = useContext(AuthContext);

    async function createPdf(e) {
        e.preventDefault();
        const val = await axios.post(
            "http://localhost:8000/api/pdf/" + String(currentUser.email)
        );
        window.open("http://localhost:8000/api/pdf/" + String(currentUser.email));
    }

    async function showUserHistory() {

    }

    return (
        <div>
            <div>
                <Button
                    variant="primary"
                    style={{ marginBottom: "15px" }}
                    onClick={createPdf}
                >
                    Create PDF
        </Button>
            </div>
        </div>
    )
}

export default FoodHistory;
