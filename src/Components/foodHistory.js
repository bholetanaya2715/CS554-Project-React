import { Line } from 'react-chartjs-2'
import React, { useState, useEffect, useContext } from 'react';
import "../App.css";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Navigation from "./Navigation";
import logo from "../images/icon.png";
import { VictoryBar, VictoryChart } from 'victory';

const FoodHistory = () => {

    const { currentUser } = useContext(AuthContext);
    const [chartData, setchartData] = useState();

    useEffect(() => {
        console.log("render");
        async function fetchData() {
            try {
                let token = await currentUser.getIdToken();
                const { data } = await axios.get(
                    "http://localhost:8000/api/chart" + String(currentUser.email),
                    {
                        headers: {
                            accept: "application/json",
                            "Accept-Language": "en-US,en;q=0.8",
                            "Content-Type": "multipart/form-data",
                            authtoken: token,
                        },
                    }
                );


                // const { data } = await axios.get(
                //     "http://localhost:8000/api/chart/" + String(currentUser.email)
                // );
                let arrayData = [];
                data.map((p) => arrayData.push(p))
                console.log("arrayData", arrayData);
                setchartData(arrayData)
                // setchartData(data[0].calories)
                // console.log("Data:" + data[0].calories)
                // console.log("ChartData:" + chartData)

            } catch (error) {

            }

        }
        fetchData();
    }, []);


    async function createPdf(e) {
        e.preventDefault();
        const val = await axios.post(
            "http://localhost:8000/api/pdf/" + String(currentUser.email)
        );
        window.open("http://localhost:8000/api/pdf/" + String(currentUser.email));
    }




    // const data = [
    //     { quarter: 1, earnings: 13000 },
    //     { quarter: 2, earnings: 16500 },
    //     { quarter: 3, earnings: 14250 },
    //     { quarter: 4, earnings: 19000 }
    // ];

    return (
        <div>
            <header className="App-header">
                <a href="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
                <p>to a healthy life</p>
                <Navigation />
            </header>
            <div style={{ width: '400px', heigh: "400px" }}>

                <VictoryChart>
                    <VictoryBar
                        // data={data}
                        x="quarter"
                        y="earnings"
                    />
                </VictoryChart>
            </div>
            <div>
                <Button
                    variant="primary"
                    style={{ marginBottom: "15px" }}
                    onClick={createPdf}
                >
                    Create PDF
        </Button>
            </div>
        </div >
    )
}

export default FoodHistory;
