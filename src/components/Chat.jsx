import React, { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();

  const userData = useSelector((store) => store.user);
  const firstName = userData?.firstName;
  const userID = userData?._id;

  const fetchMessages = async () => {
    const chat = await axios.get(baseUrl + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const messages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.firstName,
        newMessage: msg?.text,
      };
    });
    setMessages(messages);
  };
  //firstName, userID, targetUserId, newMessage

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName, userID, targetUserId, newMessage });
  };

  useEffect(() => {
    if (!userID) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userID, targetUserId });

    socket.on("messageReceived", ({ firstName, newMessage }) => {
      console.log("message received", firstName, newMessage);
      setMessages((messages) => [...messages, { firstName, newMessage }]);
    });

    return () => socket.disconnect();
  }, [userID, targetUserId]);

  useEffect(() => {
    fetchMessages();
  }, []);

  console.log({ messages });

  return (
    <div className="w-1/2 mx-auto border overflow-auto border-gray-300 flex flex-col m-5 p-1 h-[70vh]">
      {/* title */}
      <h1 className="p-4 border-b border-gray-500">Chat</h1>

      {/* messages */}
      <div className="flex-1  p-5  ">
        {messages.map((msg, index) => {
          return (
            <div
              className={`chat gap-1 ${firstName === msg?.firstName ? "chat-end" : "chat-start"}`}
              key={index}
            >
              <div class="chat-header">
                {msg.firstName}
                <time class="text-xs opacity-50">2 hours ago</time>
              </div>
              <div class="chat-bubble">{msg.newMessage}</div>
              <div class="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      {/* message input + send button*/}
      <div className="flex-1  p-2 flex flex-col justify-end ">
        <div className="p-2 border border-gray-700   gap-2  flex ">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-gray-900 rounded-lg"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
