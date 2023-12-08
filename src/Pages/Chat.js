import React, { useState, useEffect, useContext } from "react";
import apiRequest from "../Api/index";
import NavBar from "../Components/NavBar";
import AppHeader from "../Components/AppHeader";
import Message from "../Pages/Message";
import { UserContext } from "../Provider/UserProvider";

const Chat = () => {
  const { isAdmin, user, setUser } = useContext(UserContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);
  const BEURL = process.env.REACT_APP_BE_URL;

  useEffect(() => {
    // Your logic to determine if user should be set as true or false
    const shouldSetUserAsTrue = true; // Replace with your condition

    if (shouldSetUserAsTrue) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [setUser]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        if (user && user.id) {
          const response = await apiRequest.get(
            `${BEURL}/chat/${isAdmin ? "teacher" : "student"}/${user.id}`
          );
          setChatrooms(response.data);
        }
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
    };

    fetchChatrooms();
  }, [user, isAdmin, BEURL]);

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
                onClick={() => setSelectedChatroomId(chatroom.id)}
              >
                {/* Display the properties of each chatroom */}
                <ul>
                  {Object.entries(chatroom).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {JSON.stringify(value)}
                    </li>
                  ))}
                </ul>
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
