import { Line } from 'react-chartjs-2'
import React, { Component, useState, useEffect, useContext } from 'react';
import "../App.css";
import { AuthContext } from "../firebase/Auth";

const FoodHistory = (props) => {
    const [userData, setUserData] = useState(undefined);
    const { currentUser } = useContext(AuthContext);

    async function fetchData() {
        const res = await fetch("http://localhost:8000/api/" + String(currentUser.email));
        res
            .json()
            .then(res => {
                console.log("response is " + res);
                setUserData(res)
            })
            .catch(err => console.log("error is " + err));
    }

    useEffect(
        () => {
            fetchData();
        },
        []
    );

    const calorieData = {
        labels: ['1-5-2020', '2-5-2020', '3-5-2020', '4-5-2020', '5-5-2020', '6-5-2020', '7-5-2020', '8-5-2020', '9-5-2020', '10-5-2020'],
        datasets: [
            {
                label: 'Daily Calorie Chart',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40, 170, 180, 320]
            }
        ]
    };



    return (
        <Line data={calorieData} />
    )
}

class Message extends Component {

    render() {
        return (
            <section>
                <div className='user-diet'>
                    <h1 className='History'>User Diet History</h1>
                    <div>
                        <FoodHistory />
                    </div>
                </div>
            </section>
        );
    }
}



export default FoodHistory