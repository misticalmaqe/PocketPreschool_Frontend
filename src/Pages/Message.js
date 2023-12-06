import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const socket = io("http://localhost:3000/");

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() !== "") {
      const newMessage = { text: inputMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");

      // Emit the message to the server
      socket.emit("chatMessage", newMessage);
    }
  }, [inputMessage, setMessages, setInputMessage, socket]);

  useEffect(() => {
    // Handle incoming messages from the server
    const handleChatMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("chatMessage", handleChatMessage);

    // Cleanup socket event listener when component unmounts
    return () => {
      socket.off("chatMessage", handleChatMessage);
    };
  }, [socket]);

  useEffect(() => {
    // This will be executed once when the component mounts
    socket.on("connect", () => {
      handleSendMessage(`You connect with id :${socket.id}`);
    });

    // Emit the message to the server once when the component mounts
    socket.emit("custom-event", 10, "hi", { a: "a" });

    // Cleanup socket event listener when component unmounts
    return () => {
      socket.off("connect");
    };
  }, [handleSendMessage, socket]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 flex-grow">
      {/* Display Messages Container */}
      <div
        className="p-4 mb-4 max-w-md overflow-y-auto"
        style={{ height: "300px", border: "1px solid #ccc" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-container ${
              msg.sender === "user" ? "bg-userBackground" : "bg-adminBackground"
            }`}
          >
            <div
              style={{
                backgroundColor: msg.sender === "user" ? "#008000" : "#4A90E2",
              }}
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

      {/* Input Box for Sending Messages Container */}
      <div className="flex items-center w-full p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="border border-green-300 p-2 mr-2 flex-grow"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
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
