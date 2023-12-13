import React, { useState, useEffect, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import apiRequest from "../Api/index";
import NavBar from "../Components/NavBar";
import AppHeader from "../Components/AppHeader";
import { UserContext } from "../Provider/UserProvider";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function formatDate(dateTimeString) {
  const options = {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateTimeString).toLocaleDateString("en-SG", options);
}

const Chat = () => {
  const { isAdmin, user, child } = useContext(UserContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [combineArray, setCombineArray] = useState([]);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), {});
  const location = useLocation();
  const { chatroomId } = useParams();

  const fetchTeachersChat = async () => {
    if (user && user.id) {
      const response = await apiRequest.get(`${BEURL}/chat/teacher/${user.id}`);
      setChatrooms(response.data);
    }
  };

  const fetchChildrensChat = async () => {
    if (user && user.id) {
      const childrenRes = await apiRequest.get(
        `${BEURL}/user/child/${user.id}`
      );
      const childrenIds = childrenRes.data.map((item) => item.id);
      const response = await apiRequest.get(
        `${BEURL}/chat/child/${childrenIds}`
      );
      setChatrooms(response.data);
    }
  };

  useEffect(() => {
    if (isAdmin === true) {
      fetchTeachersChat();
    } else {
      fetchChildrensChat();
    }
  }, [child, user, isAdmin]);

  // Combine child and chatroom arrays into one
  const arr3 = child.concat(chatrooms);

  // Set the new array into a useState
  useEffect(() => {
    // Check if the new array is different from the current state
    const isDifferentArray =
      JSON.stringify(arr3) !== JSON.stringify(combineArray);

    if (isDifferentArray) {
      setCombineArray(arr3);
      setLastMessageTime(getLastMessageTime(arr3));
    }
  }, [arr3, combineArray]);

  // Function to get the timestamp of the last message
  function getLastMessageTime(array) {
    if (array.length === 0) {
      return null;
    }

    const lastMessage = array.reduce((prev, current) =>
      prev.updatedAt > current.updatedAt ? prev : current
    );

    return lastMessage ? lastMessage.updatedAt : null;
  }

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      e.preventDefault();

      const newMessage = { text: inputMessage, sender: "user" };

      // Update chatrooms state with the new message
      setChatrooms((prevChatrooms) => [...prevChatrooms, newMessage]);
      // Update combineArray state
      setCombineArray((prevCombineArray) => [...prevCombineArray, newMessage]);
      // Update lastMessageTime
      setLastMessageTime(newMessage.updatedAt);

      socket.emit("send-message", newMessage, chatroomId);

      console.log("Message sent to server:", newMessage);

      // Log the last message time after sending a message
      const lastMessageTime = getLastMessageTime([...chatrooms, newMessage]);
      console.log("Last Message Time:", lastMessageTime);

      // Pass last message time to Message.js
      if (location && location.state) {
        location.state.timestamp = lastMessageTime;
        navigate(`/chat/${chatroomId}/Message`, { ...location.state });
      }

      setInputMessage(""); // Clear the input after sending

      return newMessage; // Return the new message data
    }
  };

  // Extract timestamp from props
  const { timestamp } = location.state || {};
  console.log(combineArray);
  return (
    <div>
      <AppHeader input="Chat" />
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-screen p-4 text-center mt-8">
          <h2 className="text-lg font-semibold mb-4">Chatrooms</h2>
          <p>
            Last Message Time:{" "}
            {timestamp ? formatDate(timestamp) : "No messages"}
          </p>
          <ul className="list-none">
            {combineArray.map((room, index) => (
              <React.Fragment key={`${room.id}-${room.type || index}`}>
                <li
                  onClick={() =>
                    navigate(`/chat/${room.id}/Message`, {
                      chatRoomsId: room.id,
                    })
                  }
                  className="relative group mb-2 flex justify-between items-center"
                  style={{ position: "relative", marginBottom: "0.5rem" }}
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4  rounded-full mr-2">
                      <img src={room.displayPhoto} alt="display photo" />
                    </div>
                    <div>{room.fullName}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(room.createdAt)}
                  </div>
                </li>
                <hr key={`hr-${room.id}`} style={{ width: "100%" }} />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;

//Problems consistent eroor loading on chat page(resolved)
// date not using the last message
//extra logo appearing at the bottom
