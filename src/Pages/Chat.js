import React, { useState, useEffect, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import ChatHeader from '../Components/ChatHeader';
import { UserContext } from '../Provider/UserProvider';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function formatDate(dateTimeString) {
  const options = {
    day: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(dateTimeString).toLocaleDateString('en-SG', options);
}

const Chat = () => {
  const { isAdmin, user, child } = useContext(UserContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [combineArray, setCombineArray] = useState([]);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [extractedData, setExtractedData] = useState([]);
  const navigate = useNavigate();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), [BEURL]);
  const location = useLocation();
  const { chatroomId } = useParams();

  const fetchTeachersChat = async () => {
    if (user && user.id) {
      const response = await axios.get(`${BEURL}/chat/teacher/${user.id}`, {
        headers: { Authorization: localStorage.getItem('authToken') },
      });
      setChatrooms(response.data);
    }
  };

  const fetchChildrensChat = async () => {
    if (user && user.id) {
      const childrenRes = await axios.get(`${BEURL}/user/child/${user.id}`, {
        headers: { Authorization: localStorage.getItem('authToken') },
      });
      const childrenIds = childrenRes.data.map((item) => item.id);
      const response = await axios.get(`${BEURL}/chat/child/${childrenIds}`, {
        headers: { Authorization: localStorage.getItem('authToken') },
      });
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

  const arr3 = child.concat(chatrooms);

  useEffect(() => {
    // Check if arr3 is different from combineArray
    const isDifferentArray =
      JSON.stringify(arr3) !== JSON.stringify(combineArray);

    if (isDifferentArray) {
      // If arrays are different, update combineArray, lastMessageTime
      setCombineArray(arr3);

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

      setExtractedData(newData);
    }
  }, [arr3, combineArray]);

  return (
    <div
      className={`${
        isAdmin ? 'text-adminText' : 'text-parentText'
      } bg-white font-bold h-screen`}
    >
      <ChatHeader input="Chat" />
      <div className="flex flex-col items-start text-center">
        {extractedData.map((data) => (
          <React.Fragment key={data.id}>
            <div
              onClick={() =>
                navigate(`/chat/${data.chatroomId}/Message`, {
                  state: { chatRoomsId: data.chatroomId, childName: data.name }, // Pass chatRoomsId and children in state
                })
              }
              className="py-[15px] px-[30px] flex items-center"
            >
              <div className="rounded-full mr-10">
                <img
                  src={data.displayPhoto}
                  alt="display photo"
                  className="w-[40px] h-[40px]"
                />
              </div>
              <h1 className="text-[1.5em]">{data.name}</h1>
            </div>
            <hr
              className={`${
                isAdmin
                  ? 'rounded-full w-full border-[0.1em] border-adminText'
                  : 'rounded-full w-full border-[0.1em] border-parentText'
              }`}
            />
          </React.Fragment>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Chat;
