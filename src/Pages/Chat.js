// Chat.js

import React, { useState, useEffect, useContext } from "react";
import apiRequest from "../Api/index";
import NavBar from "../Components/NavBar";
import AppHeader from "../Components/AppHeader";
import Message from "../Pages/Message";
import { UserContext } from "../Provider/UserProvider";

const Chat = () => {
  const { isAdmin, user } = useContext(UserContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        if (user) {
          // Use apiRequest to make the API request
          const response = await apiRequest.get(
            `/api/chatrooms/${user.id}/${isAdmin ? "teacher" : "student"}`
          );
          setChatrooms(response.data);
        }
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
    };

    fetchChatrooms();
  }, [user, isAdmin]);

  const handleChatroomSelect = (chatroomId) => {
    setSelectedChatroomId(chatroomId);
  };

  return (
    <div>
      <AppHeader input="Chat" />
      <NavBar />
      <div className="flex">
        {/* Display Chatrooms */}
        <div className="w-1/4 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Chatrooms</h2>
          <ul>
            {chatrooms.map((chatroom) => (
              <li
                key={chatroom.id}
                onClick={() => handleChatroomSelect(chatroom.id)}
              >
                {chatroom.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Display Messages */}
        <div className="flex-grow p-4">
          {selectedChatroomId && (
            <Message chatroomId={selectedChatroomId} isAdmin={isAdmin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

// Based on auth get the teacher and parents chatrooms and display them
//onlick on the chatroom
//navigate to the ${chatroomId}/messgae
//take the chatroomId from backend
//need to store and call on the chatrooms individually
