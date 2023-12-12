import React, { useState, useEffect, useContext } from "react";
import apiRequest from "../Api/index";
import NavBar from "../Components/NavBar";
import AppHeader from "../Components/AppHeader";
import Message from "../Pages/Message";
import { UserContext } from "../Provider/UserProvider";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const BEURL = process.env.REACT_APP_BE_URL;

  //function to fetch chatrooms from BE for TEACHERS
  const fetchTeachersChat = async () => {
    if (user && user.id) {
      const response = await apiRequest.get(`${BEURL}/chat/teacher/${user.id}`);
      setChatrooms(response.data);
    }
  };

  const fetchChildrensChat = async () => {
    if (user && user.id) {
      //get childrensIds from children table
      const childrenRes = await apiRequest.get(
        `${BEURL}/user/child/${user.id}`
      );
      const childrenIds = childrenRes.data.map((item) => item.id);
      //fetch chatrooms with childrens Ids
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

  return (
    <div>
      <AppHeader input="Chat" />
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-screen p-4  text-center mt-8">
          <h2 className="text-lg font-semibold mb-4">Chatrooms</h2>
          <ul className="list-none">
            {child.map((child) => (
              <React.Fragment key={child.id}>
                <li
                  onClick={() => navigate(`/chat/${child.id}/Message`)}
                  className="relative group mb-2 flex justify-between items-center"
                  style={{ position: "relative", marginBottom: "0.5rem" }}
                >
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 bg-blue-500 rounded-full mr-2" // replace code here to remove the circle
                      // Adjust the size and color of the circle as needed
                    ></div>
                    <div>{child.fullName}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(
                      chatrooms.find((room) => room.childrenId === child.id)
                        ?.createdAt
                    )}
                    {/*  take create at and last message from chat table */}
                  </div>
                </li>
                <hr style={{ width: "100%" }} />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;
