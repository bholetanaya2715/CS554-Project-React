import React, { useState, useEffect, useContext, Component } from "react";
import SignOutButton from "./SignOut";
import "../App.css";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../firebase/Auth";

function Account() {
    const { currentUser } = useContext(AuthContext);
    const addInforamtion = async (event) => {
        event.preventDefault();
        let { weight, height } = event.target.elements;
        let information = {
            userID: currentUser.email,
            displayName: currentUser.displayName,
            weightData: weight.value,
            heightData: height.value,
        };
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/user/addInforamtion",
                information
            );
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <h2>Account Page</h2>
            <form onSubmit={addInforamtion}>
                <div className="form-group">
                    <label>Email : </label>
                    <label> {currentUser.email}</label>
                </div>
                <div className="form-group">
                    <label>
                        Your Height (In cm):
            <input
                            className="form-control"
                            id="height"
                            required
                            name="height"
                            type="number"
                            placeholder="Your Height (In cm)"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Your Weight (In Kg):
            <input
                            className="form-control"
                            id="weight"
                            required
                            name="weight"
                            type="number"
                            placeholder="Your Weight (In Kg)"
                        />
                    </label>
                </div>
                <button id="submitButton" name="submitButton" type="submit">
                    Add Information
        </button>
            </form>
            <ChangePassword />
            <SignOutButton />
        </div>
    );
}

export default Account;
