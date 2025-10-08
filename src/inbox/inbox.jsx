import React from 'react';
import './inbox.css';

import plane from '../assets/paper-plane.png';

export default function Inbox() {
    return (
        <main className="flex-fill d-flex flex-column justify-content-between align-items-center p-3">
            <h2>Inbox</h2>

            <div className="window container-fluid d-flex gap-5 flex-fill">
                <div className="messages border rounded flex-fill overflow-y-scroll">

                <button className="btn w-100">
                    <div className="card d-flex flex-row justify-content-start">
                    <div className="d-flex flex-column p-3">
                        <img className="img-fluid" src={plane} width="48"/>
                        <div className="badge text-bg-secondary">NEW</div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title"><strong>Friend's Name</strong></h5>
                        <p className="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button className="btn w-100">
                    <div className="card d-flex flex-row justify-content-start">
                    <div className="d-flex flex-column p-3">
                        <img className="img-fluid" src={plane} width="48"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Friend's Name</h5>
                        <p className="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button className="btn w-100">
                    <div className="card d-flex flex-row justify-content-start">
                    <div className="d-flex flex-column p-3">
                        <img className="img-fluid" src={plane} width="48"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Friend's Name</h5>
                        <p className="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button className="btn w-100">
                    <div className="card d-flex flex-row justify-content-start">
                    <div className="d-flex flex-column p-3">
                        <img className="img-fluid" src={plane} width="48"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Friend's Name</h5>
                        <p className="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button className="btn w-100">
                    <div className="card d-flex flex-row justify-content-start">
                    <div className="d-flex flex-column p-3">
                        <img className="img-fluid" src={plane} width="48"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Friend's Name</h5>
                        <p className="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                <button className="btn w-100">
                    <div className="card d-flex flex-row justify-content-start">
                    <div className="d-flex flex-column p-3">
                        <img className="img-fluid" src={plane} width="48"/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Friend's Name</h5>
                        <p className="card-text">Message preview...</p>
                    </div>
                    </div>
                </button>

                </div>

                <div className="view-message container-fluid p-5 bg-primary">
                <div className="paper container w-75 h-100 p-3 bg-white">
                    <p>Message...</p>
                    <p>"I do know that whosoever shall put their trust in God shall be supported in their trials, and their troubles, and their afflictions, and shall be lifted up at the last day."</p>
                    <p>Alma 36:3</p>
                </div>
                </div>
            </div>      
        </main>
    )
}