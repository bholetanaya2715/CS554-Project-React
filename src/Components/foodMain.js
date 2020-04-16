import React, { useState, useEffect } from 'react';

const FoodMain = (props) => {
    const [ userData, setUserData ] = useState(undefined);
    const [ foodData, setFoodData ] = useState(undefined);
    const [ foodQuery, setFoodQuery ] = useState("");
    
    //const { register, handleSubmit, watch, errors } = useForm()
    //const onSubmit = data => { console.log(data) }

    //console.log(watch('example')) // watch input value by passing the name of it

    
    async function fetchData() {
        const res = await fetch("http://localhost:8000/api/5e938fa88336ab21f4d02126");
        res
            .json()
            .then(res => {
                console.log("response is " + res);
                setUserData(res)
            })
            .catch(err => console.log("error is " + err));
    }

    async function postData() {
        const res = await fetch("http://localhost:8000/api",{
            method: 'POST',
            body: JSON.stringify({
                "name":"Sejal Vyas",
                "username": "blackwidow",
                "password" : "myPassword"
               })
        });
        res
            .json()
            .then(res => {
                console.log("response is " + res);
                setUserData(res)
            })
            .catch(err => console.log("error is " + err));
    }

    async function getFoodData() {
        const res = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id' : '5a16d255',
                'x-app-key' : 'c6d62bf1fa1b98f09f0bd525d1c94007'
              },            
            body: JSON.stringify({
                "query": foodQuery
            })
        });

        let response = await res.json();
        console.log(response);
        setFoodData(response.foods);
        //postFoodData("5e938f628336ab21f4d02124", response.foods);
    }

    async function postFoodData(id, foodArr) {
        console.log("foodData in postFoodData is");
        console.log(foodArr);
        const res = await fetch("http://localhost:8000/api/food",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id": id,
                "foodArr": foodArr
               })
        });

        let response = await res.json();
        setUserData(response);
    }

	useEffect(
		() => {
            fetchData();
		},
		[]
	);


    function handleChange(event) {
        setFoodQuery(event.target.value)
    }

    function handleSubmit(event) {
        getFoodData();
        event.preventDefault();
    }

	
    
        return (
            <div className='show-body'>
                <h1 className='cap-first-letter'></h1>
                <p>
                    User id is {userData && userData.userId}
                </p>
                <div>

                    <dl className='list-unstyled'>
                        {foodData &&
                            foodData.map((food) => {
                                return (<dt key={food.food_name}>{food.food_name} had {food.nf_calories} calories
                                    <img alt={food.food_name} src={food.photo.thumb}></img>
                                </dt>
                                );
                        })}
                    </dl>

                </div>
                {/*<form onSubmit={handleSubmit(onSubmit)}>
                    What did you eat today?
                    <input name="example" defaultValue="test" ref={register} />
                
                
                
                    <input type="submit" />
                    </form> */}

                <form onSubmit={handleSubmit}>
                <label>
                    What did you eat today?
                    <br></br>
                    <input type="text" value={foodQuery} onChange={handleChange} />
                </label>
                <br></br>
                <input type="submit" value="Submit" />

                </form>
            </div>

        );
    

};

export default FoodMain;
