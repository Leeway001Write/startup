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

        // Start simulating messages, save function to terminate interval
        /* 
        const stopMessages = simulateMessages((newMessage) => {
            setMessagesList((currentList) => [newMessage, ...currentList]);
            saveMessage(newMessage);
        });

        return () => stopMessages();
        */
    }, [])

    const clickMessageHandler = function(messageKey) {
        setCurrentMessage(messagesList[messageKey]);

        if (messagesList[messageKey].isUnread) {
            const updated = [...messagesList];
            updated[messageKey].isUnread = false;
            setMessagesList(updated);

            console.log(messageKey);
            markSavedMessageAsRead(messagesList[messageKey]); // Mark as read in local DB
        }
    };

    const handleDelete = function() {
        if (confirm("Permanently DELETE all messages?")) {
            // Clear DB for user
            let user = localStorage.getItem('user');
            let messageDB = JSON.parse(localStorage.getItem('messages'));
            messageDB[user] = [];
            localStorage.setItem('messages', JSON.stringify(messageDB));
        
            // Update page
            setMessagesList([]);
            setCurrentMessage(null);
        }
    }

    return (
        <main className="flex-fill d-flex flex-column justify-content-between align-items-center p-3">
            <h2>Inbox</h2>

            <div id="window" className="container-fluid d-flex gap-5 flex-fill">
                <div id="controls" className="d-flex flex-column align-items-end gap-1 m-0 p-0">
                    <button id="delete-button" className="btn btn-small bg-warning text-white" onClick={ handleDelete }>Delete All</button>
                    <div className="messages border rounded flex-fill overflow-y-scroll">

                        { messagesList.map((msg, i) => (
                            <MessageCard key={i} sender={msg.sender} content={msg.content} isUnread={msg.isUnread} onClick={ () => clickMessageHandler(i) } />
                        ))}

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

function saveMessage(msg) {
    let user = localStorage.getItem('user');
    let messageDB = JSON.parse(localStorage.getItem('messages'));
    messageDB[user] = [msg, ...messageDB[user]];
    localStorage.setItem('messages', JSON.stringify(messageDB));
}

function markSavedMessageAsRead(msg) {
    /*
        This DOES NOT WORK properly. Currently, a *COPY* of messages are saved as unread. It works in a single session, but upon reopening the inbox the duplicates will show.
        The solution likely involves giving each message a unique key
    */
   saveMessage(msg);
}