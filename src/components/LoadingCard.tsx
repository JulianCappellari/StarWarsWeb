
import React from "react";

const LoadingCard: React.FC = () => {
  return (
    <div className="relative group animate-pulse">
      <div className="card w-40 h-12 md:w-48 md:h-20 bg-gray-300 rounded-lg shadow-lg relative overflow-hidden z-10 flex items-center justify-center">
        <h2 className="text-transparent bg-gray-400 w-2/3 h-4 rounded-lg"></h2>
      </div>

      
      <div className="absolute top-full left-0 right-0 transition-all duration-300 transform -translate-y-full bg-gray-200 rounded-lg shadow-lg h-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-center justify-center group-hover:rounded-b-lg group-hover:rounded-t-none hidden md:flex">
        <div className="flex space-x-6 text-black justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold text-transparent bg-gray-400 w-1/2 h-4 rounded-lg"></span>
            <span className="text-transparent bg-gray-400 w-1/3 h-4 rounded-lg"></span>
          </div>
        </div>
      </div>

      
      <div className="absolute bottom-full space-x-2 left-0 right-0 transition-all duration-300 transform translate-y-full bg-gray-200 rounded-lg shadow-lg h-20 opacity-0 group-hover:-translate-y-0 group-hover:opacity-100 flex items-center justify-center z-20 rounded-md group-hover:rounded-t-lg group-hover:rounded-b-none hidden md:flex">
        <div className="flex space-x-6 text-black justify-center items-center">
          <div className="flex space-x-2 flex-col justify-center items-center">
            <span className="font-bold text-transparent bg-gray-400 w-1/2 h-4 rounded-lg"></span>
            <span className="text-transparent bg-gray-400 w-1/3 h-4 rounded-lg"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
