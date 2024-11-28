import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3030'); // Backend URL


function App() {
  const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (data) => {
            setChat((prevChat) => [...prevChat, data]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', message);
            setMessage('');
        }
    };


    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
          <h1>Chat App</h1>
          <div
              style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  height: '300px',
                  overflowY: 'scroll',
                  marginBottom: '10px',
              }}
          >
              {chat.map((msg, index) => (
                  <p key={index} style={{ margin: '5px 0' }}>
                      {msg}
                  </p>
              ))}
          </div>
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '80%', padding: '10px' }}
          />
          <button
              onClick={sendMessage}
              style={{
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '10px',
              }}
          >
              Send
          </button>
      </div>
  );
}

export default App
