import React from "react";
import './send.css';

export default function Send() {
    return (
        <main className="flex-fill m-3 d-flex flex-column justify-content-start align-items-center gap-3">
            <div>
                <p>Weather: sunny</p>
                <p>Sky color: <b>lightblue</b></p>
            </div>
            
            <div className="container flex-fill border p-0 overflow-hidden d-flex flex-column bg-info">
                <div className="container-fluid d-flex flex-fill"></div>
                <div className="container-fluid d-flex justify-content-between">
                <img className="ratio ratio-1x1 w-25" src="./graphics/house.jpeg"/>
                <img className="ratio ratio-1x1 w-25" src="./graphics/house.jpeg" />
                </div>
                <div className="bg-dark">x</div>
                
                <div className="airplane position-absolute">
                <img src="./graphics/paper-plane.png" width="36" rotate="90deg" />
                </div>
            </div>
            
            <button type="button" className="throw-button btn bg-secondary btn-lg text-white fw-bold">Throw</button>
        </main>
    )
}