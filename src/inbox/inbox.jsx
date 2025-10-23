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
        // Load stored all messages
        if (!localStorage.getItem('messages')) {
            const template = { dallin: [], lee: [] };
            localStorage.setItem('messages', JSON.stringify(template));
        }
        setMessagesList(getMessages(messagesList));

        // Start simulating messages, save function to terminate interval
        const stopMessages = simulateMessages((newMessage) => {
            setMessagesList((currentList) => [newMessage, ...currentList]);
            saveMessage(newMessage);
        });

        return () => stopMessages();
    }, [])

    const clickMessageHandler = function(messageKey) {
        setCurrentMessage(messagesList[messageKey]);

        if (messagesList[messageKey].isUnread) {
            const updated = [...messagesList];
            updated[messageKey].isUnread = false;
            setMessagesList(updated);
        }
    };

    return (
        <main className="flex-fill d-flex flex-column justify-content-between align-items-center p-3">
            <h2>Inbox</h2>

            <div className="window container-fluid d-flex gap-5 flex-fill">
                <div className="messages border rounded flex-fill overflow-y-scroll">

                    { messagesList.map((msg, i) => (
                        <MessageCard key={i} sender={msg.sender} content={msg.content} isUnread={msg.isUnread} onClick={ () => clickMessageHandler(i) } />
                    ))}

                </div>

                <div className="view-message container-fluid p-5 bg-primary">
                    { currentMessage != null && <Letter sender={currentMessage.sender} content={currentMessage.content} /> }
                </div>
            </div>      
        </main>
    )
}

function getMessages() {
    let user = 'dallin'; //localStorage.getItem('user');
    return JSON.parse(localStorage.getItem('messages'))[user];
}

function saveMessage(msg) {
    let user = 'dallin'; 
    let messageDB = JSON.parse(localStorage.getItem('messages'));
    messageDB[user] = [msg, ...messageDB[user]];
    localStorage.setItem('messages', JSON.stringify(messageDB));
}