import React from "react";
import { useEffect } from "react";
import './write.css';

import { useNavigate } from "react-router-dom";
import { updateWeather } from '../weather.js';

export default function Write() {
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch weather now if possible to make opening the Send page smoother for the user
        async function fetchWeather() {
            console.log("Updated weather before going to Send page: ", await updateWeather());
        }
        fetchWeather();
    }, []);

    const sendHandler = function() {
        // Save the message locally
        let recipient = document.getElementById("recipient").value
        let message = document.getElementById("letter").value;

        // Navigate to "Send" page
        navigate("/send", { state: { recipient, message } });
    }

    return (
        <main className="d-flex flex-column justify-content-start align-items-center p-4 flex-fill">
            <h2>Write a letter</h2>
            <form>
                <div className="paper p-0 d-flex flex-column">
                    <div className="recipient-line p-0 m-0 d-flex align-items-center">
                        <label className="writing p-0">Dear</label>
                        <input id="recipient" type="text" className="content p-3" placeholder="recipient,"></input>
                    </div>
                    <textarea id="letter" className="content writing p-3" placeholder="Write your message here"></textarea>
                </div>
                <button type="button" className="btn btn-lg bg-secondary text-white" onClick={ sendHandler }>Send</button>
            </form>
        </main>
    )
}