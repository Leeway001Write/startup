import React from 'react';
import { useState, useEffect } from 'react';
import MessageCard from './messageCard.jsx';
import './inbox.css';

import { simulateMessages } from './simulatedMessaging.js';

export default function Inbox() {
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        // Start simulating messages, save function to terminate interval
        const stopMessages = simulateMessages((newMessage) => {
            setMessagesList((currentList) => [newMessage, ...currentList]);
        });

        return () => stopMessages();
    }, [])

    const clickMessageListener = function(messageKey) {
        const updated = [...messagesList];
        updated[messageKey].isUnread = false;
        setMessagesList(updated);
    };

    return (
        <main className="flex-fill d-flex flex-column justify-content-between align-items-center p-3">
            <h2>Inbox</h2>

            <div className="window container-fluid d-flex gap-5 flex-fill">
                <div className="messages border rounded flex-fill overflow-y-scroll">

                    { messagesList.map((msg, i) => (
                        <MessageCard key={i} sender={msg.sender} content={msg.content} isUnread={msg.isUnread} markAsRead={ () => clickMessageListener(i) } />
                    ))}

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