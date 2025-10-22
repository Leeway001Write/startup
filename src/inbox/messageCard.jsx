import React from 'react';
import './inbox.css';

import plane from '../assets/paper-plane.png';

export default function MessageCard({ text }) {
    return (
        <button className="btn w-100">
            <div className="card d-flex flex-row justify-content-start">
                <div className="d-flex flex-column p-3">
                    <img className="img-fluid" src={plane} width="48"/>
                    <div className="badge text-bg-secondary">NEW</div>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-start"><strong>Friend's Name</strong></h5>
                    <p className="card-text text-start">{ text }</p>
                </div>
            </div>
        </button>
    )
}