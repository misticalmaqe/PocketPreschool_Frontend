// Message.js
import React, { useEffect, useState, useMemo, useContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Provider/UserProvider';
import ProfileHeader2 from '../Components/profilePage/profileHeader2';

const Message = ({ childName }) => {
  const { isAdmin } = useContext(UserContext);
  const [inputMessage, setInputMessage] = useState('');
  const [chatData, setChatData] = useState([]);
  const { chatroomId } = useParams();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), []);

  const location = '/chat';

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
  const postNewMessage = async (e) => {
    try {
      e.preventDefault();
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

        const messageWithDate = {
          text: inputMessage,
          createdAt: new Date().toISOString(),
        };

        socket.emit('send-message', messageWithDate, chatroomId);

        console.log('New message posted:', newMessage);
        console.log('Message sent to server:', newMessage);

        setChatData((prevMessages) => [
          ...prevMessages,
          {
            text: inputMessage,
            isAdmin: isAdmin,
            createdAt: new Date().toISOString(),
          },
        ]);
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
  }, [socket, setChatData]);

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
    <div className="bg-white h-full">
      <ProfileHeader2 input={childName} navigateLoc={location} />
      <div className="pb-[45px]">
        {chatData.map((msg) => {
          const messageDate = new Date(msg.createdAt);
          const singaporeTime = messageDate.toLocaleString('en-SG', {
            timeZone: 'Asia/Singapore',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          });
          return (
            <div
              key={msg.id}
              className={`${
                isAdmin === msg.isAdmin
                  ? 'chat chat-end p-[10px] bg-white'
                  : 'chat chat-start p-[10px] bg-white'
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.isAdmin
                    ? 'bg-adminBackground text-adminText'
                    : 'bg-parentBackground text-parentText'
                }`}
              >
                <h1 className="text-[1.3em]">{msg.text}</h1>
                <h6 className="text-right text-[0.8em]">{singaporeTime}</h6>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-center fixed bottom-0 w-full">
        <input
          type="text"
          placeholder="Type your message..."
          className={`${
            isAdmin
              ? 'border-none rounded-m placeholder-adminAccent border-adminText bg-adminBackground w-full pl-[10px] text-adminText'
              : 'border-none rounded-m placeholder-parentAccent border-parentText bg-parentBackground w-full pl-[10px] text-parentText'
          } focus:outline-none focus:border-nones`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={(e) => postNewMessage(e)}
          className={`${
            isAdmin
              ? 'bg-adminText text-white cursor-pointer p-3 w-1/5'
              : 'bg-parentText text-white cursor-pointer p-3 w-1/5'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
