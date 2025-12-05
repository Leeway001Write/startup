import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './send.css';

import { Raindrop, Snowflake} from './particles.jsx';
import { updateWeather } from "../weather";

import plane from '../assets/plane.png';
import house_sender from '../assets/sender-house.png';
import house_recipient from '../assets/recipient-house.png';
const SKY_SUNNY = "#87CEEB";
const SKY_CLOUDY = "#B0C4DE";
const SKY_OVERCAST = "#9E9E9E";
const SKY_SNOW = "#EEE";
const SKY_NIGHT = "#313F56";

export default function Send() {
    const [isThrown, setIsThrown] = useState(false);
    const [skyColor, setSkyColor] = useState("#000");

    const [particles, setParticles] = useState([]);

    const location = useLocation();
    const recipient = location.state.recipient;
    const message = location.state.message;

    useEffect(() => {
        // Render sky based off of currently stored weather
        let weather = {
            description: localStorage.getItem("weatherDesc"),
            precipitation: localStorage.getItem("precipitation")
        }
        if (weather && weather.description) {
            setSkyColor(skyForWeather(weather.description));
        }

        // Attempt to update weather anew
        async function fetchWeather() {
            console.log("Send page getting weather...");
            let weather = await updateWeather();
            console.log("Send page updated weather: ", weather);
            setSkyColor(skyForWeather(weather.description));
        }
        fetchWeather();

        if (weather.precipitation && weather.precipitation !== "none") {
            // Animate precipitation
            const particleIntervalIds = []; // To be able to clear intervals
            particleIntervalIds.push(setInterval(() => {
                // Create particle
                const pos = Math.random() * 100 + '%'; // Random left position
                let p = (<Raindrop pos={pos} key={pos} />);
                let fallTime = 0.7; // seconds (see particles.css)
                if (weather.precipitation === "snow") {
                    p = (<Snowflake pos={pos} key={pos} />);
                    fallTime = 3.0;
                }
    
                // Add to state (which then adds it to DOM)
                setParticles((existingParticles) => {
                    return [...existingParticles, p];
                });
    
                // Delete particle after animation finishes
                particleIntervalIds.push(setTimeout(() => {
                    setParticles((existingParticles) => existingParticles.filter((_, index) => index !== 0));
                }, fallTime * 1000)); // Time matches that of animation
            }, 10));
    
            return () => {
                particleIntervalIds.map((id) => clearInterval(id));
            };
        }
    }, []);

    const throwPlane = async function() {
        if (!isThrown) {
            // Send message
            let user = localStorage.getItem('user');
            let msg = {
                sender: user,
                recipient: recipient,
                content: message,
                isUnread: true
            };
            const data = await sendMessage(msg, recipient);

            if (data.status === "sent") {
                // Animate plane
                document.getElementById("plane").classList.remove("not-thrown");
                document.getElementById("plane").classList.add("thrown");
                
                // Update button
                setIsThrown(true);
            }
        }
    };

    return (
        <main className="flex-fill m-3 d-flex flex-column justify-content-start align-items-center gap-3">
            <div id="sky" className="container flex-fill border p-0 overflow-hidden d-flex flex-column" style={{ backgroundColor: skyColor }}>
                <div id="weather">{ particles }</div>
                <div className="container-fluid d-flex flex-fill"></div>
                <div className="container-fluid d-flex justify-content-between">
                    <img id="house-recipient" className="ratio ratio-1x1 w-25" src={house_recipient}/>
                    <img id="house-sender" className="ratio ratio-1x1 w-25" src={house_sender}/>
                </div>
                <div className="bg-dark">x</div>
                
                <img id="plane" className="airplane not-thrown" src={plane} width="36" rotate="90deg"/>
            </div>
            
            { !isThrown && <button type="button" className="throw-button btn bg-secondary btn-lg text-white fw-bold" onClick={ throwPlane }>Throw</button> }
            { isThrown && <button type="button" className="throw-button btn bg-primary btn-lg text-black fw-bold">Sent!</button> }
        </main>
    )
}

async function sendMessage(msg, recipient) {
    const response = await fetch('api/send', {
        method: 'POST',
        body: JSON.stringify({
            message: msg
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
    
    return await response.json();
}

function skyForWeather(weather) {
    let color = "#000";
    switch (weather) {
        case "sunny":
            color = SKY_SUNNY;
            break;
        case "partly cloudy":
            color = SKY_CLOUDY;
            break;
        case "overcast":
            color = SKY_OVERCAST;
            break;
        case "snow":
            color = SKY_SNOW;
            break;
        case "night":
            color = SKY_NIGHT;
            break;
        default:
            color = SKY_SUNNY;
            break;
    }

    return color;
}