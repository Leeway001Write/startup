import React from 'react';
import { useState } from 'react';
import './inbox.css';

import plane from '../assets/paper-plane.png';

export default function MessageCard({ sender, content, isUnread, onClick}) {

    return (
        <button className="btn w-100" onClick={ onClick }>
            <div className="card d-flex flex-row justify-content-start">
                <div className="d-flex flex-column p-3">
                    <img className="img-fluid" src={plane} width="48"/>
                    {isUnread && <NewMessageBadge />}
                </div>
                <div className="card-body">
                    <h5 className="card-title text-start"><strong>From: { sender }</strong></h5>
                    <p className="card-text text-start">{ content }</p>
                </div>
            </div>
        </button>
    )
}

function NewMessageBadge() {
    return (
        <div className="badge text-bg-secondary">NEW</div>
    )
}