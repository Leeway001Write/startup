import React from "react";

export default function Write() {
    return (
        <main class="d-flex flex-column justify-content-start align-items-center p-4 flex-fill">
            <h2>Write a letter</h2>
            <form>
                <textarea class="paper p-3" placeholder="Write your message here"></textarea>
                <button class="btn btn-lg bg-secondary text-white">Send</button>
            </form>
        </main>
    )
}