const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-row items-center justify-around">
        <div className="flex items-center">
          <img src="/vite.svg" className="w-8 h-8 mr-2" alt="Logo" />
          <span className="text-white text-xl font-semibold">Web Chat App</span>
        </div>
        <ul className="flex space-x-4 text-white">
          <li>
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
