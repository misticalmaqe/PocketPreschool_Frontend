import React, { useState, useEffect, useContext } from 'react';
import apiRequest from '../Api/index';
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
import Message from '../Pages/Message';
import { UserContext } from '../Provider/UserProvider';

const Chat = () => {
  const { isAdmin, user, child } = useContext(UserContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);
  const BEURL = process.env.REACT_APP_BE_URL;

  //function to fetch chatrooms from BE for TEACHERS
  const fetchTeachersChat = async () => {
    if (user && user.id) {
      const response = await apiRequest.get(`${BEURL}/chat/teacher/${user.id}`);
      setChatrooms(response.data);
    }
  };

  //function to fetch chatrooms from BE for PARENTS
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

  //useEffect to fetch rooms in chat page
  useEffect(() => {
    if (isAdmin === true) {
      fetchTeachersChat();
    } else {
      fetchChildrensChat();
    }
    console.log(child);
  }, [child, user, isAdmin]);

  return (
    <div>
      <AppHeader input="Chat" />
      <NavBar />
      <div className="flex">
        {/* Display Chatrooms */}
        <div className="w-1/4 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Chatrooms</h2>
          <ul>
            {child.data.map((chatroom) => (
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
