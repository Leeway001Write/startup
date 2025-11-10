import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './send.css';

import { updateWeather } from "../weather";

import plane from '../assets/plane.png';
import house_sender from '../assets/sender-house.png';
import house_recipient from '../assets/recipient-house.png';
import raindrop from '../assets/raindrop.png';
const SKY_SUNNY = "#87CEEB";
const SKY_CLOUDY = "#B0C4DE";
const SKY_OVERCAST = "#9E9E9E";
const SKY_SNOW = "#FFF";
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
        let weather = localStorage.getItem('weather');
        if (weather) {
            setSkyColor(skyForWeather(weather));
        }

        // Attempt to update weather anew
        async function fetchWeather() {
            console.log("Send page getting weather...");
            let weather = await updateWeather();
            console.log("Send page updated weather: ", weather);
            setSkyColor(skyForWeather(weather));
        }
        fetchWeather();

        if (weather === "overcast") {
            // Animate rain
            const particleIds = []
            particleIds.push(setInterval(() => {
                const pos = Math.random() * 100 + '%'; // Random left position
                const p = (<img className="raindrop" src={ raindrop } style={{left: pos}} key={ pos }/>);
    
                setParticles((existingParticles) => {
                    return [...existingParticles, p];
                });
    
                particleIds.push(setTimeout(() => {
                    setParticles((existingParticles) => existingParticles.filter((_, index) => index !== 0));
                }, 1000));
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
            recipient: recipient,
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