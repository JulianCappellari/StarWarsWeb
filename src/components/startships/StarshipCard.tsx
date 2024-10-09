import { IStarship } from "@/src/interfaces/IStarship";
import Link from "next/link";
import React from "react";

interface IStarshipCard {
  starship: IStarship;
}

const StarshipCard: React.FC<IStarshipCard> = ({ starship }) => {
  return (
    <div className="relative group group-hover:scale-110 text-center">
      <Link
        href={`/starships/${starship.name}`}
        className="card w-40 h-12 bg-orange-400 transition-all duration-400 rounded-lg shadow-lg relative overflow-hidden z-10 flex items-center justify-center group-hover:rounded-lg md:group-hover:rounded-none"
      >
        <h2 className="text-white font-bold">{starship.name}</h2>
      </Link>

      {/* Cuadro de información que aparece al hacer hover (visibilidad en móvil) */}
      <div className="absolute top-full left-0 right-0 transition-all duration-300 transform -translate-y-full bg-white rounded-lg shadow-lg h-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-center justify-center group-hover:rounded-b-lg group-hover:rounded-t-none hidden md:flex">
        <div className="flex space-x-6 text-black justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold">🚀 Modelo</span>
            <span className="text-xs">{starship.model}</span>
          </div>
        </div>

        <Link
          href={`/starships/${starship.name}`}
          className="bg-orange-600 text-white font-semibold rounded-lg p-2 absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-xs"
        >
          Más info
        </Link>
      </div>

      {/* Cuadro inferior (visibilidad en móvil) */}
      <div className="absolute bottom-full space-x-2 left-0 right-0 transition-all duration-300 transform translate-y-full bg-white rounded-lg shadow-lg h-20 opacity-0 group-hover:-translate-y-0 group-hover:opacity-100 flex items-center justify-center z-20 rounded-md group-hover:rounded-t-lg group-hover:rounded-b-none hidden md:flex">
        <div className="flex space-x-6 text-black justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold">Pasajeros</span>
            <span>{starship.passengers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarshipCard;
