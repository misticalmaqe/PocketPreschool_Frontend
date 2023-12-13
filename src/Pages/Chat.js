import React, { useState, useEffect, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import axios from "axios";
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
  const [extractedData, setExtractedData] = useState([]);
  const navigate = useNavigate();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), {});
  const location = useLocation();
  const { chatroomId } = useParams();

  const fetchTeachersChat = async () => {
    if (user && user.id) {
      const response = await axios.get(`${BEURL}/chat/teacher/${user.id}`, {
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      console.log("Fetched Teachers Chat:", response.data);
      setChatrooms(response.data);
      console.log("Chatrooms:", response.data);
    }
  };

  const fetchChildrensChat = async () => {
    if (user && user.id) {
      const childrenRes = await axios.get(`${BEURL}/user/child/${user.id}`, {
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      const childrenIds = childrenRes.data.map((item) => item.id);
      const response = await axios.get(`${BEURL}/chat/child/${childrenIds}`, {
        headers: { Authorization: localStorage.getItem("authToken") },
      });
      console.log("Fetched Children's Chat:", response.data);
      setChatrooms(response.data);
      console.log("Chatrooms:", response.data);
    }
  };

  useEffect(() => {
    if (isAdmin === true) {
      fetchTeachersChat();
    } else {
      fetchChildrensChat();
    }
  }, [child, user, isAdmin]);

  const arr3 = child.concat(chatrooms);

  useEffect(() => {
    // Check if arr3 is different from combineArray
    const isDifferentArray =
      JSON.stringify(arr3) !== JSON.stringify(combineArray);

    if (isDifferentArray) {
      // If arrays are different, update combineArray, lastMessageTime
      setCombineArray(arr3);
      setLastMessageTime(getLastMessageTime(arr3));

      // Load image data for each displayPhoto in arr3
      const newData = arr3
        .map(({ id, displayPhoto, fullName, chatroomId }) => ({
          id,
          displayPhoto,
          name: fullName,
          chatroomId: chatroomId !== undefined ? chatroomId : id,
        }))
        .filter(
          (data) =>
            data.displayPhoto !== undefined &&
            data.name !== undefined &&
            data.displayPhoto !== null
        );

      // Preload images to ensure they are loaded before rendering
      newData.forEach(async (data) => {
        const image = new Image();
        image.src = data.displayPhoto;
        await new Promise((resolve) => {
          image.onload = resolve;
        });
      });

      // Log the new extracted data and update extractedData state
      console.log("New Extracted Data:", newData);
      setExtractedData(newData);
    }
  }, [arr3, combineArray]);

  function getLastMessageTime(array) {
    if (array.length === 0) {
      return null;
    }

    const lastMessage = array.reduce((prev, current) =>
      prev.updatedAt > current.updatedAt ? prev : current
    );

    return lastMessage ? lastMessage.updatedAt : null;
  }

  const { timestamp } = location.state || {};
  console.log("Combine Array:", combineArray);
  console.log("Extracted Data:", extractedData);

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
            {extractedData.map((data) => (
              <React.Fragment key={data.id} childName={data.name}>
                <li>
                  {data.name}
                  <img
                    src={data.displayPhoto}
                    alt="display photo"
                    className="w-[20px] h-[20px]"
                  />
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;
