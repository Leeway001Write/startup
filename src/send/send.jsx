import React from "react";

export default function Send() {
    return (
        <main class="flex-fill m-3 d-flex flex-column justify-content-start align-items-center gap-3">
            <div>
                <p>Weather: sunny</p>
                <p>Sky color: <b>lightblue</b></p>
            </div>
            
            <div class="container flex-fill border p-0 overflow-hidden d-flex flex-column bg-info">
                <div class="container-fluid d-flex flex-fill"></div>
                <div class="container-fluid d-flex justify-content-between">
                <img class="ratio ratio-1x1 w-25" src="./graphics/house.jpeg"/>
                <img class="ratio ratio-1x1 w-25" src="./graphics/house.jpeg" />
                </div>
                <div class="bg-dark">x</div>
                
                <div class="airplane position-absolute">
                <img src="./graphics/paper-plane.png" width="36" rotate="90deg" />
                </div>
            </div>
            
            <button type="button" class="throw-button btn bg-secondary btn-lg text-white fw-bold">Throw</button>
        </main>
    )
}