// Message.js
import React, { useEffect, useState, useMemo, useContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Provider/UserProvider';

const Message = () => {
  const { isAdmin } = useContext(UserContext);
  const [inputMessage, setInputMessage] = useState('');
  const [chatData, setChatData] = useState([]);
  const { chatroomId } = useParams();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), []);

  //function to fetch Data
  const fetchData = async () => {
    try {
      if (chatroomId) {
        // Check if chatroomId is defined
        // Fetch chat data
        const response = await axios.get(`${BEURL}/chat/rooms/${chatroomId}`, {
          headers: { Authorization: localStorage.getItem('authToken') },
        });
        setChatData(response.data);
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  //onClick send button function.
  const postNewMessage = async () => {
    try {
      if (inputMessage.trim() !== '') {
        const newMessage = { text: inputMessage, sender: 'user' };
        await axios.post(
          `${BEURL}/chat/rooms`,
          {
            text: inputMessage,
            chatRoomsId: chatroomId,
            isAdmin: isAdmin,
          },
          {
            headers: { Authorization: localStorage.getItem('authToken') },
          }
        );

        socket.emit('send-message', newMessage, chatroomId);

        console.log('New message posted:', newMessage);
        console.log('Message sent to server:', newMessage);

        setChatData((prevMessages) => [...prevMessages, inputMessage]);
        setInputMessage('');
      }
    } catch (error) {
      console.error('Error posting new message:', error);
      return null;
    }
  };

  //useEffect to check if message is received by other person and update setChatData
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log('Received message from server:', message);
      setChatData((prevMessages) => [...prevMessages, message]);
    };
    socket.on('receive-message', handleReceiveMessage);
    console.log('Received message from server:', handleReceiveMessage);
    // socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [socket]);

  //
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected to server with id: ${socket.id}`);
      if (chatroomId) {
        // Check if chatroomId is defined
        // Join the room when the component mounts
        socket.emit('join-room', chatroomId);
        fetchData();
      }
    });

    return () => {
      socket.off('connect');
    };
  }, [socket, chatroomId]);

  //function for keyboard
  const handleKeyPress = (e) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 mb-4 max-w-screen-xl mx-auto overflow-y-auto flex-grow">
        {chatData.map((msg, index) => (
          <div
            key={index}
            className={`message-container w-full ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`message-bubble p-2 rounded mb-2 ${
                msg.sender === 'user'
                  ? 'bg-userBackground'
                  : 'bg-adminBackground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-grow" />

      <div className="flex items-center w-full p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="border p-2 mr-2 flex-grow"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={() => postNewMessage()}
          className="p-2 rounded bg-blue-500 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
