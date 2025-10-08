import React from 'react';

export default function Inbox() {
    return (
        <main class="flex-fill d-flex flex-column justify-content-between align-items-center p-3">
            <h2>Inbox</h2>

            <div class="window container-fluid d-flex gap-5 flex-fill">
                <div class="messages border rounded flex-fill overflow-y-scroll">

                <button class="btn w-100">
                    <div class="card d-flex flex-row justify-content-start">
                    <div class="d-flex flex-column p-3">
                        <img class="img-fluid" src="./graphics/paper-plane.png" width="48"/>
                        <div class="badge text-bg-secondary">NEW</div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title"><strong>Friend's Name</strong></h5>
                        <p class="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button class="btn w-100">
                    <div class="card d-flex flex-row justify-content-start">
                    <div class="d-flex flex-column p-3">
                        <img class="img-fluid" src="./graphics/paper-plane.png" width="48"/>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Friend's Name</h5>
                        <p class="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button class="btn w-100">
                    <div class="card d-flex flex-row justify-content-start">
                    <div class="d-flex flex-column p-3">
                        <img class="img-fluid" src="./graphics/paper-plane.png" width="48"/>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Friend's Name</h5>
                        <p class="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button class="btn w-100">
                    <div class="card d-flex flex-row justify-content-start">
                    <div class="d-flex flex-column p-3">
                        <img class="img-fluid" src="./graphics/paper-plane.png" width="48"/>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Friend's Name</h5>
                        <p class="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button class="btn w-100">
                    <div class="card d-flex flex-row justify-content-start">
                    <div class="d-flex flex-column p-3">
                        <img class="img-fluid" src="./graphics/paper-plane.png" width="48"/>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Friend's Name</h5>
                        <p class="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button class="btn w-100">
                    <div class="card d-flex flex-row justify-content-start">
                    <div class="d-flex flex-column p-3">
                        <img class="img-fluid" src="./graphics/paper-plane.png" width="48"/>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Friend's Name</h5>
                        <p class="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                </div>

                <div class="view-message container-fluid p-5 bg-primary">
                <div class="paper container w-75 h-100 p-3 bg-white">
                    <p>Message...</p>
                    <p>"I do know that whosoever shall put their trust in God shall be supported in their trials, and their troubles, and their afflictions, and shall be lifted up at the last day."</p>
                    <p>Alma 36:3</p>
                </div>
                </div>
            </div>      
        </main>
    )
}