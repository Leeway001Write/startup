import React from "react";
import './write.css';

export default function Write() {
    return (
        <main className="d-flex flex-column justify-content-start align-items-center p-4 flex-fill">
            <h2>Write a letter</h2>
            <form>
                <textarea className="paper p-3" placeholder="Write your message here"></textarea>
                <button className="btn btn-lg bg-secondary text-white">Send</button>
            </form>
        </main>
    )
}