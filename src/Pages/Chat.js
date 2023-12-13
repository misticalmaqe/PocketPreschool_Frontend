import React, { useState, useEffect, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import AppHeader from '../Components/AppHeader';
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
  const [inputMessage, setInputMessage] = useState('');
  const [extractedData, setExtractedData] = useState([]);
  const navigate = useNavigate();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), {});
  const location = useLocation();
  const { chatroomId } = useParams();

  const fetchTeachersChat = async () => {
    if (user && user.id) {
      const response = await axios.get(`${BEURL}/chat/teacher/${user.id}`, {
        headers: { Authorization: localStorage.getItem('authToken') },
      });
      console.log('Fetched Teachers Chat:', response.data);
      setChatrooms(response.data);
      console.log('Chatrooms:', response.data);
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
      console.log("Fetched Children's Chat:", response.data);
      setChatrooms(response.data);
      console.log('Chatrooms:', response.data);
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
    }
  }, [arr3, combineArray]);

  // const arr3 = child.concat(chatrooms);

  // useEffect(() => {
  //   // Check if arr3 is different from combineArray
  //   const isDifferentArray =
  //     JSON.stringify(arr3) !== JSON.stringify(combineArray);

  //   if (isDifferentArray) {
  //     // If arrays are different, update combineArray, lastMessageTime
  //     setCombineArray(arr3);
  //     setLastMessageTime(getLastMessageTime(arr3));

  //     // Load image data for each displayPhoto in arr3
  //     const newData = arr3
  //       .map(({ id, displayPhoto, fullName, chatroomId }) => ({
  //         id,
  //         displayPhoto,
  //         name: fullName,
  //         chatroomId: chatroomId !== undefined ? chatroomId : id,
  //       }))
  //       .filter(
  //         (data) =>
  //           data.displayPhoto !== undefined &&
  //           data.name !== undefined &&
  //           data.displayPhoto !== null
  //       );

  //     // Preload images to ensure they are loaded before rendering
  //     newData.forEach(async (data) => {
  //       const image = new Image();
  //       image.src = data.displayPhoto;
  //       await new Promise((resolve) => {
  //         image.onload = resolve;
  //       });
  //     });

  //     // Log the new extracted data and update extractedData state
  //     console.log('New Extracted Data:', newData);
  //     setExtractedData(newData);
  //   }
  // }, [arr3, combineArray]);

  // function getLastMessageTime(array) {
  //   if (array.length === 0) {
  //     return null;
  //   }

  //   const lastMessage = array.reduce((prev, current) =>
  //     prev.updatedAt > current.updatedAt ? prev : current
  //   );

  //   return lastMessage ? lastMessage.updatedAt : null;
  // }

  // const { timestamp } = location.state || {};
  // console.log('Combine Array:', combineArray);
  // console.log('Extracted Data:', extractedData);

  return (
    <div>
      <AppHeader input="Chat" />
      <div className="flex justify-center items-center h-screen">
        <div className="w-screen p-4 text-center mt-8">
          <ul className="list-none">
            {/* {extractedData.map((data) => (
              <React.Fragment key={data.id} childName={data.name}>
                <li
                  onClick={() =>
                    navigate(`/chat/${data.chatRoomId}/Message`, {
                      chatRoomsId: data.chatRoomId,
                    })
                  }
                  className="relative group mb-2 flex justify-between items-center"
                  style={{ position: 'relative', marginBottom: '0.5rem' }}
                >
                  <div className="flex items-center">
                    <div className="w-4 h-4  rounded-full mr-2">
                      <img
                        src={data.displayPhoto}
                        alt="display photo"
                        className="w-[20px] h-[20px]"
                      />
                    </div>
                    <div>{data.name}</div>
                  </div>
                </li>
              </React.Fragment>
            ))} */}
            {combineArray.map((room, index) => (
              <React.Fragment key={`${room.id}-${room.type || index}`}>
                <li
                  onClick={() =>
                    navigate(`/chat/${room.id}/Message`, {
                      chatRoomsId: room.id,
                    })
                  }
                  className="relative group mb-2 flex justify-between items-center"
                  style={{ position: 'relative', marginBottom: '0.5rem' }}
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
                <hr key={`hr-${room.id}`} style={{ width: '100%' }} />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Chat;
