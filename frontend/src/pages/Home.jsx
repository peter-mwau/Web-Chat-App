import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      ws.current = new WebSocket("ws://localhost:8080");

      ws.current.onopen = () => {
        ws.current.send(
          JSON.stringify({ type: "userJoined", username: currentUser })
        );
      };

      ws.current.onmessage = (event) => {
        const newMessages = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      };

      return () => {
        ws.current.close();
      };
    }
  }, [isLoggedIn]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      sender: currentUser,
      text: newMessage,
      type: "message",
      image: `https://picsum.photos/seed/${Math.random()}/50`,
    };

    ws.current.send(JSON.stringify(message));
    setNewMessage("");
  };

  const handleLogin = () => {
    if (currentUser.trim() !== "") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {!isLoggedIn ? (
        <div className="flex flex-col mx-auto h-full container w-[80%] items-center justify-center">
          <h1 className="text-2xl mb-4">Login</h1>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your username"
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      ) : (
        <>
          <header className="bg-gray-800 p-4 text-white">
            <h1 className="text-xl">Web Chat App</h1>
          </header>
          <main className="flex-grow p-4 overflow-auto w-full md:w-[80%] lg:w-[60%] mx-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 ${
                    message.sender === currentUser ? "justify-end" : ""
                  }`}
                >
                  {message.type === "message" && (
                    <>
                      {message.sender !== currentUser && (
                        <img
                          src={message.image}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div
                        className={`relative p-4 rounded-lg ${
                          message.sender === currentUser
                            ? "bg-blue-500 text-white self-end"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        <div className="font-bold">{message.sender}</div>
                        <div>{message.text}</div>
                        <div
                          className={`absolute bottom-0 ${
                            message.sender === currentUser
                              ? "right-0 transform translate-x-full"
                              : "left-0 transform -translate-x-full"
                          }`}
                        >
                          <div
                            className={`w-0 h-0 border-t-8 border-t-transparent ${
                              message.sender === currentUser
                                ? "border-l-8 border-l-blue-500"
                                : "border-r-8 border-r-gray-200"
                            } border-b-8 border-b-transparent`}
                          ></div>
                        </div>
                      </div>
                      {message.sender === currentUser && (
                        <img
                          src={message.image}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                    </>
                  )}
                  {message.type === "notification" && (
                    <div className="text-center w-full text-gray-500">
                      {message.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
          <footer className="bg-gray-800 p-5 shadow-inner">
            <div className="flex items-center w-full md:w-[80%] lg:w-[60%] mx-auto">
              <input
                type="text"
                className="flex-grow p-3 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition-all transform hover:scale-105"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Home;
