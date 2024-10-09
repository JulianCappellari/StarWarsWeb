'use client'
import React from 'react';

interface Props {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  homeworld: string; 
}

const PersonCard: React.FC<Props> = ({
  name,
  height,
  mass,
  hair_color,
  eye_color,
  homeworld,
}) => {
  return (
    <div className="card w-48 h-64 bg-blue-400 transition-all duration-400 rounded-lg shadow-lg relative overflow-hidden">
      
      <div className="first-content h-full w-full flex justify-center items-center transition-all duration-400">
        <span className="text-xl font-bold text-white">{name}</span>
      </div>

      
      <div className="second-content h-0 w-full opacity-0 flex flex-col justify-center items-center transition-all duration-400 absolute top-0 left-0 bg-blue-500 rounded-lg">
        <span className="text-md font-semibold text-white"><strong>Altura:</strong> {height}</span>
        <span className="text-md font-semibold text-white"><strong>Masa:</strong> {mass}</span>
        <span className="text-md font-semibold text-white"><strong>Color de cabello:</strong> {hair_color}</span>
        <span className="text-md font-semibold text-white"><strong>Color de ojos:</strong> {eye_color}</span>
        <span className="text-md font-semibold text-white"><strong>Planeta natal:</strong> {homeworld}</span>
      </div>

      
      <style jsx>{`
        .card:hover {
          border-radius: 15px;
          cursor: pointer;
          transform: scale(1.1);
          box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.705);
          background: rgb(103, 151, 255);
        }

        .card:hover .first-content {
          height: 0;
          opacity: 0;
        }

        .card:hover .second-content {
          opacity: 1;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default PersonCard;
