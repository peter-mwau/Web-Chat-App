import { useState } from "react";
import _ from "lodash";

const Home = () => {
  const [messages, setMessages] = useState([
    {
      sender: "User1",
      text: "Hello!",
      image: `https://picsum.photos/seed/${_.uniqueId()}/50`,
    },
    {
      sender: "User2",
      text: "Hi there!",
      image: `https://picsum.photos/seed/${_.uniqueId()}/50`,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          sender: "User1",
          text: newMessage,
          image: `https://picsum.photos/seed/${_.uniqueId()}/50`,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl">Chat App</h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto bg-gray-100">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 ${
                message.sender === "User1" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender !== "User1" && (
                <img
                  src={message.image}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div
                className={`relative p-4 rounded-lg shadow w-auto max-w-4/5 ${
                  message.sender === "User1"
                    ? "bg-blue-100 self-end"
                    : "bg-white self-start"
                }`}
              >
                <p className="flex flex-col pb-2">
                  <strong>{message.sender}:</strong> {message.text}
                </p>
                <div
                  className={`absolute top-0 ${
                    message.sender === "User1"
                      ? "right-0 -mr-2"
                      : "left-0 -ml-2"
                  }`}
                >
                  <svg
                    className={`h-4 w-4 ${
                      message.sender === "User1"
                        ? "text-blue-100"
                        : "text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0L24 12H0L12 0z" />
                  </svg>
                </div>
              </div>
              {message.sender === "User1" && (
                <img
                  src={message.image}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 p-4">
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 rounded-l border border-gray-300"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
