import React from 'react';
import { useState } from 'react';
import './inbox.css';

export default function Letter({ sender, content }) {
    return (
        <div className="paper container w-75 h-100 p-3 bg-white">
            <p>{ content }</p>
            <p className="text-end p-0 m-0">Sincerely,</p>
            <p className="text-end p-0 m-0"><em>{ sender }</em></p>
        </div>
    )
}