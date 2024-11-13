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
    <div className="flex flex-col h-screen bg-gray-100">
      {!isLoggedIn ? (
        <div className="flex flex-col mx-auto h-full container w-[80%] items-center justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
          <input
            type="text"
            className="p-3 w-full max-w-md border border-gray-300 rounded-lg mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your username"
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      ) : (
        <>
          <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white shadow-md">
            <h1 className="text-2xl font-semibold text-center">Web Chat App</h1>
          </header>
          <main className="flex-grow p-6 overflow-auto bg-gray-200 w-full md:w-[80%] lg:w-[60%] items-center justify-center mx-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 ${
                    message.sender === currentUser ? "justify-end" : ""
                  }`}
                >
                  {message.sender !== currentUser && (
                    <img
                      src={message.image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full shadow-lg"
                    />
                  )}
                  <div
                    className={`relative max-w-[70%] p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 ${
                      message.sender === currentUser
                        ? "bg-blue-500 text-white self-end"
                        : "bg-white text-gray-800"
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
                            : "border-r-8 border-r-white"
                        } border-b-8 border-b-transparent`}
                      ></div>
                    </div>
                  </div>
                  {message.sender === currentUser && (
                    <img
                      src={message.image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full shadow-lg"
                    />
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
