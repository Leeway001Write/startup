import React from 'react';
import { useState, useEffect } from 'react';
import MessageCard from './messageCard.jsx';
import Letter from './letter.jsx';
import './inbox.css';

import { simulateMessages } from './simulatedMessaging.js';

export default function Inbox() {
    const [messagesList, setMessagesList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(null);

    useEffect(() => {
        // Load all stored messages
        if (!localStorage.getItem('messages')) {
            localStorage.setItem('messages', []);
        }
        const loadMessages = async function() {
            const response = await fetch('api/inbox', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            let messages = await response.json();

            
            setMessagesList(messages);
        }
        loadMessages();
    }, [])

    const clickMessageHandler = async function(messageId) {
        const index = messagesList.findIndex(msg => msg._id === messageId);

        setCurrentMessage(messagesList[index]);

        if (messagesList[index].isUnread) {
            const updated = [...messagesList];
            updated[index].isUnread = false;
            setMessagesList(updated);

            await markMessage(messageId, false); // Mark as read in DB
        }
    };

    const handleDelete = async function(id) {
        if (confirm("Permanently DELETE all read messages?")) {
            // Clear DB for user
            if (!id) {
                id = '0';
            }
            await fetch(`/api/inbox/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
        
            // Update page
            setMessagesList(messagesList.filter((msg) => msg._id !== id && msg.isUnread));
            if (currentMessage && currentMessage._id === id) {
                setCurrentMessage(null);
            }
        }
    }

    return (
        <main className="flex-fill d-flex flex-column justify-content-between align-items-center p-3">
            <h2>Inbox</h2>

            <div id="window" className="container-fluid d-flex gap-5 flex-fill">
                <div id="controls" className="d-flex flex-column align-items-end gap-1 m-0 p-0">
                    <button id="delete-button" className="btn btn-small bg-warning text-white" onClick={ () => handleDelete('0') }>Delete All Read Messages</button>
                    <div className="messages border rounded flex-fill overflow-y-scroll">

                        { messagesList.length > 0 &&
                            messagesList.map((msg, i) => (
                                <MessageCard key={msg._id} sender={msg.sender} content={msg.content} isUnread={msg.isUnread} onClick={ () => clickMessageHandler(msg._id) } />
                            ))
                        }

                    </div>
                </div>

                <div className="view-message container-fluid p-5 bg-primary">
                    { currentMessage != null && <Letter sender={currentMessage.sender} content={currentMessage.content} /> }
                </div>
            </div>      
        </main>
    )
}

function getMessages() {
    let user = localStorage.getItem('user');
    return JSON.parse(localStorage.getItem('messages'))[user];
}

async function markMessage(id, isUnread) {
    await fetch(`/api/inbox/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ isUnread: isUnread })
    });
}