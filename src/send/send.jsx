import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './send.css';

import plane from '../assets/paper-plane.png';
import house from '../assets/house.jpeg';

export default function Send() {
    const [isThrown, setIsThrown] = useState(false);

    const location = useLocation();
    const recipient = location.state.recipient;
    const message = location.state.message;

    useEffect(() => {
        let weather = getWeather(); // Stub for weather API
        let color = "#000";
        switch (weather) {
            case "sunny":
                color = "#87CEEB"; // light sky blue
                break;
            case "partly cloudy":
                color = "#B0C4DE"; // cloudy blue
                break;
            case "overcast":
                color = "#9E9E9E"; // gray
                break;
            case "snow":
                color = "#FFFFFF"; // white
                break;
            case "night":
                color = "#312F36"; //black
                break;
            default:
                color = "#87CEEB";
                break;
        }

        document.getElementById("sky").style.backgroundColor = color;
    }, []);

    const throwPlane = function() {
        if (!isThrown) {
            // Animate plane
            document.getElementById("plane").classList.remove("not-thrown");
            document.getElementById("plane").classList.add("thrown");

            // Update button
            setIsThrown(true);

            // Send message
            let user = localStorage.getItem('user');
            let msg = {
                sender: user,
                content: message,
                isUnread: true
            };
            let messageDB = JSON.parse(localStorage.getItem('messages'));
            messageDB[recipient] = [msg, ...messageDB[recipient]];
            localStorage.setItem('messages', JSON.stringify(messageDB));
        }
    };

    return (
        <main className="flex-fill m-3 d-flex flex-column justify-content-start align-items-center gap-3">
            <div id="sky" className="container flex-fill border p-0 overflow-hidden d-flex flex-column">
                <div className="container-fluid d-flex flex-fill"></div>
                <div className="container-fluid d-flex justify-content-between">
                    <img className="ratio ratio-1x1 w-25" src={house}/>
                    <img className="ratio ratio-1x1 w-25" src={house}/>
                </div>
                <div className="bg-dark">x</div>
                
                <div id="plane" className="airplane not-thrown">
                    <img src={plane} width="36" rotate="90deg" />
                </div>
            </div>
            
            { !isThrown && <button type="button" className="throw-button btn bg-secondary btn-lg text-white fw-bold" onClick={ throwPlane }>Throw</button> }
            { isThrown && <button type="button" className="throw-button btn bg-primary btn-lg text-black fw-bold">Sent!</button> }
        </main>
    )
}

function getWeather() {
    let rand = Math.floor(Math.random() * 4);
    let weather = "";
    switch (rand) {
        case 0:
            weather = "sunny";
            break;
        case 1:
            weather = "partly cloudy";
            break;
        case 2:
            weather = "overcast";
            break;
        case 3:
            weather = "snow";
            break;
        default:
            weather = "sunny";
            break;
    }

    return weather;
}