// import React, {
//   useEffect,
//   useState,
//   useMemo,
//   useCallback,
//   useContext,
// } from "react";
// import { io } from "socket.io-client";
// import { useParams, useLocation } from "react-router-dom";
// import apiRequest from "../Api/index";
// import { UserContext } from "../Provider/UserProvider";

// const Message = () => {
//   const { isAdmin, user } = useContext(UserContext);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [chatData, setChatData] = useState([]);
//   const { chatroomId } = useParams();
//   const location = useLocation();
//   const BEURL = process.env.REACT_APP_BE_URL;
//   const socket = useMemo(() => io(BEURL, { reconnection: true }), []);

//   const handleSendMessage = useCallback(
//     async (e) => {
//       if (e.key === "Enter" && inputMessage.trim() !== "") {
//         e.preventDefault();

//         const newMessage = { text: inputMessage, sender: "user" };

//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         setInputMessage("");

//         socket.emit("send-message", newMessage, chatroomId);

//         console.log("Message sent to server:", newMessage);
//       }
//     },
//     [inputMessage, setMessages, setInputMessage, socket, chatroomId]
//   );

//   const postNewMessage = async () => {
//     try {
//       if (inputMessage.trim() !== "") {
//         const newMessage = { text: inputMessage };
//         await apiRequest.post(`${BEURL}/chat/rooms`, {
//           text: newMessage.text,
//           chatRoomsId: chatroomId,
//           isAdmin: isAdmin,
//         });

//         console.log("New message posted:", newMessage);
//       }
//     } catch (error) {
//       console.error("Error posting new message:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch chat data first
//     const fetchDataAndPostMessage = async () => {
//       try {
//         // Fetch chat data
//         const response = await apiRequest.get(
//           `${BEURL}/chat/rooms/${chatroomId}`
//         );
//         setChatData(response.data);
//         console.log("Chat data fetched:", response.data);
//         console.log("Chat fetched:", response);

//         // Post new message after fetching data
//         postNewMessage();
//         console.log("post new Message:", postNewMessage);
//       } catch (error) {
//         console.error("Error fetching chat data:", error);
//       }
//     };

//     // Call the function to fetch data and post message
//     fetchDataAndPostMessage();

//     return () => {
//       // Cleanup function
//     };
//   }, [inputMessage, chatroomId]);

//   useEffect(() => {
//     const handleReceiveMessage = (message) => {
//       console.log("Received message from server:", message);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     socket.on("receive-message", handleReceiveMessage);

//     return () => {
//       socket.off("receive-message", handleReceiveMessage);
//     };
//   }, [socket]);

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(`Connected to server with id: ${socket.id}`);
//       // Join the room when the component mounts
//       socket.emit("join-room", chatroomId);
//     });

//     return () => {
//       socket.off("connect");
//     };
//   }, [socket, chatroomId]);

//   const handleKeyPress = (e) => {
//     if (
//       e.key === "Enter" &&
//       !e.shiftKey &&
//       !e.ctrlKey &&
//       !e.metaKey &&
//       !e.altKey
//     ) {
//       e.preventDefault();
//       handleSendMessage(e);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="p-4 mb-4 max-w-screen-xl mx-auto overflow-y-auto flex-grow">
//         {chatData.map((msg, index) => (
//           <div
//             key={index}
//             className={`message-container w-full ${
//               msg.sender === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`message-bubble p-2 rounded mb-2 ${
//                 msg.sender === "user"
//                   ? "bg-userBackground"
//                   : "bg-adminBackground"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex-grow" />

//       <div className="flex items-center w-full p-4">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="border p-2 mr-2 flex-grow"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />

//         <button
//           onClick={handleSendMessage}
//           className="p-2 rounded bg-blue-500 text-white"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Message;
// Message.js
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { io } from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import apiRequest from "../Api/index";
import { UserContext } from "../Provider/UserProvider";

const Message = () => {
  const { isAdmin, user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const { chatroomId } = useParams();
  const location = useLocation();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), []);

  const getLastMessageTime = (array) => {
    if (array.length === 0) {
      return null;
    }

    const lastMessage = array.reduce((prev, current) =>
      prev.updatedAt > current.updatedAt ? prev : current
    );

    return lastMessage ? lastMessage.updatedAt : null;
  };

  const postNewMessage = async () => {
    console.log("heelo");
    try {
      if (inputMessage.trim() !== "") {
        const newMessage = { text: inputMessage };
        await apiRequest.post(`${BEURL}/chat/rooms`, {
          text: newMessage.text,
          chatRoomsId: chatroomId,
          isAdmin: isAdmin,
        });

        console.log("New message posted:", newMessage);
        return newMessage;
      }
    } catch (error) {
      console.error("Error posting new message:", error);
      return null;
    }
  };

  const fetchDataAndPostMessage = async () => {
    try {
      if (chatroomId) {
        // Check if chatroomId is defined
        // Fetch chat data
        const response = await apiRequest.get(
          `${BEURL}/chat/rooms/${chatroomId}`
        );
        setChatData(response.data);
        console.log("Chat data fetched:", response.data);
        console.log("Chat fetched:", response);

        // Post new message after fetching data
        const newMessage = await postNewMessage();
        console.log("post new Message:", newMessage);

        // Emit event to the parent component with the new message data
        if (newMessage) {
          socket.emit("new-message", newMessage, chatroomId);
        }
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };
  useEffect(() => {
    // Call the function to fetch data and post message
    fetchDataAndPostMessage();
  }, []);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log("Received message from server:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server with id: ${socket.id}`);
      if (chatroomId) {
        // Check if chatroomId is defined
        // Join the room when the component mounts
        socket.emit("join-room", chatroomId);
      }
    });

    return () => {
      socket.off("connect");
    };
  }, [socket, chatroomId]);

  const handleSendMessage = async (e) => {
    console.log(inputMessage);
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      e.preventDefault();

      const newMessage = { text: inputMessage, sender: "user" };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");

      socket.emit("send-message", newMessage, chatroomId);

      console.log("Message sent to server:", newMessage);

      const lastMessageTime = getLastMessageTime([...messages, newMessage]);
      console.log("Last Message Time:", lastMessageTime);

      if (location && location.state && location.state.timestamp) {
        location.state.timestamp = lastMessageTime;
      }

      return newMessage;
    }
  };

  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 mb-4 max-w-screen-xl mx-auto overflow-y-auto flex-grow">
        {chatData.map((msg, index) => (
          <div
            key={index}
            className={`message-container w-full ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`message-bubble p-2 rounded mb-2 ${
                msg.sender === "user"
                  ? "bg-userBackground"
                  : "bg-adminBackground"
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
          onClick={handleSendMessage}
          className="p-2 rounded bg-blue-500 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
// the message is show out as every single letter instead of the whole sentance at the end
