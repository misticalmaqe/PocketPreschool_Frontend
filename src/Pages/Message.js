// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useContext,
//   useMemo,
// } from "react";
// import { io } from "socket.io-client";
// import { useParams } from "react-router-dom";
// import { UserContext } from "../Provider/UserProvider";
// import apiRequest from "../Api/index";

// const Message = () => {
//   const { isAdmin, user } = useContext(UserContext);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   let { chatroomId } = useParams();
//   const BEURL = process.env.REACT_APP_BE_URL;
//   const socket = useMemo(() => io(BEURL, { reconnection: true }), []);

//   // Existing code for handling message sending
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

//   // Existing code for handling received messages
//   useEffect(() => {
//     const handleReceiveMessage = (message) => {
//       console.log("Received message from server:", message);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     socket.on("receive-message", handleReceiveMessage);

//     return () => {
//       socket.off("receive-message", handleReceiveMessage);
//     };
//   }, []);

//   // Existing code for handling socket connection
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(`Connected to server with id: ${socket.id}`);
//     });

//     return () => {
//       socket.off("connect");
//     };
//   }, []);

//   // Existing code for joining a room
//   const handleJoinRoom = () => {
//     console.log(chatroomId);
//     socket.emit("join-room", chatroomId);
//   };

//   // Existing code for handling key press
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
//         {messages.map((msg, index) => (
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

//         <button
//           onClick={handleJoinRoom}
//           className="p-2 rounded bg-green-500 text-white ml-2"
//         >
//           Join Room
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Message;
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { UserContext } from "../Provider/UserProvider";
import apiRequest from "../Api/index";

const Message = () => {
  const { isAdmin, user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { chatroomId } = useParams();
  const BEURL = process.env.REACT_APP_BE_URL;
  const socket = useMemo(() => io(BEURL, { reconnection: true }), []);

  const handleSendMessage = useCallback(
    async (e) => {
      if (e.key === "Enter" && inputMessage.trim() !== "") {
        e.preventDefault();

        const newMessage = { text: inputMessage, sender: "user" };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");

        socket.emit("send-message", newMessage, chatroomId);

        console.log("Message sent to server:", newMessage);
      }
    },
    [inputMessage, setMessages, setInputMessage, socket, chatroomId]
  );

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
      // Join the room when component mounts
      socket.emit("join-room", chatroomId);
    });

    return () => {
      socket.off("connect");
    };
  }, [socket, chatroomId]);

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

  const handleJoinRoom = () => {
    console.log(chatroomId);
    socket.emit("join-room", chatroomId);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 mb-4 max-w-screen-xl mx-auto overflow-y-auto flex-grow">
        {messages.map((msg, index) => (
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
