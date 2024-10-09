"use client";
import { fetchResourceName } from "@/src/actions/get-info";
import { IPeople } from "@/src/interfaces/IPeople";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IWeatherCard {
  person: IPeople;
}

const PersonCard2: React.FC<IWeatherCard> = ({ person }) => {
  const [homeworld, setHomeworld] = useState<string>("");

  useEffect(() => {
    const fetchHomeworld = async () => {
      if (person.homeworld) {
        const homeworldName = await fetchResourceName(person.homeworld);
        setHomeworld(homeworldName);
      }
    };

    fetchHomeworld();
  }, [person.homeworld]);
  return (
    <div className="relative group group-hover:scale-110 text-center">
      <Link
        href={`/people/${person.name}`}
        className="card w-40 h-10 md:w-48 md:h-20 bg-blue-400 transition-all duration-400 rounded-lg shadow-lg relative overflow-hidden z-10 flex items-center justify-center group-hover:rounded-none"
      >
        <h2 className="text-white font-bold">{person.name}</h2>
      </Link>

      <div className="absolute top-full left-0 right-0 transition-all duration-300 transform -translate-y-full bg-white rounded-lg shadow-lg h-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-center justify-center group-hover:rounded-b-lg group-hover:rounded-t-none">
        <div className="flex md:space-x-6 text-black justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold">🌎 Planeta</span>
            <span>{homeworld}</span>
          </div>
        </div>

        <Link
          href={`/people/${person.name}`}
          className="bg-blue-600 text-white font-semibold rounded-lg p-2 absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-xs"
        >
          Más info
        </Link>
      </div>

      <div className="absolute bottom-full space-x-2 left-0 right-0 transition-all duration-300 transform translate-y-full bg-white rounded-lg shadow-lg h-20 opacity-0 group-hover:-translate-y-0 group-hover:opacity-100 flex items-center justify-center z-20 rounded-md group-hover:rounded-t-lg group-hover:rounded-b-none">
        <div className="flex md:space-x-6 text-black justify-center items-center">
          <div className="flex md:space-x-2 flex-col justify-center items-center">
            <span className="font-bold">📏 Altura</span>
            <span>{person.height} cm</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold">⚖️ Peso</span>
            <span>{person.mass} Kg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard2;
