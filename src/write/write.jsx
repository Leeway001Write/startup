import React from "react";
import './write.css';

import { useNavigate } from "react-router-dom";

export default function Write() {
    const navigate = useNavigate();

    const sendHandler = function() {
        // Save the message locally
        console.log(document.getElementById("letter").value);

        // Navigate to "Send" page
        navigate("/send");
    }

    return (
        <main className="d-flex flex-column justify-content-start align-items-center p-4 flex-fill">
            <h2>Write a letter</h2>
            <form>
                <div className="paper p-0 d-flex flex-column">
                    <div className="recipient-line p-0 m-0 d-flex align-items-center">
                    <label className="writing p-0">Dear</label>
                    <input type="text" className="content p-3" placeholder="recipient,"></input>
                    </div>
                    <textarea id="letter" className="content writing p-3" placeholder="Write your message here"></textarea>
                </div>
                <button type="button" className="btn btn-lg bg-secondary text-white" onClick={ sendHandler }>Send</button>
            </form>
        </main>
    )
}