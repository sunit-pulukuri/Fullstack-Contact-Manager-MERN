import React from "react";
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-black">
      <div className="w-[40vw] space-y-6 p-6 bg-gradient-to-r from-red-600 to-black rounded-lg shadow-lg">
        <Link to="/register" className="inline-block w-full px-8 py-4 text-lg font-bold text-white bg-black rounded-sm focus:ring-offset-2 transform transition duration-300 hover:scale-105">
          Register
        </Link>

        <div className="h-4"></div> {/* Added spacing */}

        <Link to="/login" className="inline-block w-full px-8 py-4 text-lg font-bold text-white bg-black rounded-sm focus:ring-offset-2 transform transition duration-300 hover:scale-105">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Main;
