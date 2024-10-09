import { IPlanet } from "@/src/interfaces/IPlanet";
import Link from "next/link";
import React from "react";

interface IPlanetCard {
    planet: IPlanet;
}

const PlanetCard: React.FC<IPlanetCard> = ({ planet }) => {
    return (
        <div className="relative group group-hover:scale-110 text-center">
            
            <Link
                href={`/planets/${planet.name}`}
                className="card w-40 h-10 md:w-48 md:h-20 bg-red-500 transition-all duration-400 rounded-lg shadow-lg relative overflow-hidden z-10 flex items-center justify-center group-hover:rounded-lg md:group-hover:rounded-none"
            >
                <h2 className="text-white font-bold">{planet.name}</h2>
            </Link>

            {/* Cuadro de información que aparece al hacer hover (visibilidad en móvil) */}
            <div className="absolute top-full left-0 right-0 transition-all duration-300 transform -translate-y-full bg-white rounded-lg shadow-lg h-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex flex-col items-center justify-center group-hover:rounded-b-lg group-hover:rounded-t-none hidden md:flex">
                <div className="flex space-x-6 text-black justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-bold">🌍 Clima</span>
                        <span>{planet.climate}</span>
                    </div>
                </div>

                <Link
                    href={`/planets/${planet.name}`}
                    className="bg-red-600 text-white font-semibold rounded-lg p-2 absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-xs"
                >
                    Más info
                </Link>
            </div>

            {/* Cuadro inferior (visibilidad en móvil) */}
            <div className="absolute bottom-full space-x-2 left-0 right-0 transition-all duration-300 transform translate-y-full bg-white rounded-lg shadow-lg h-20 opacity-0 group-hover:-translate-y-0 group-hover:opacity-100 flex items-center justify-center z-20 rounded-md group-hover:rounded-t-lg group-hover:rounded-b-none hidden md:flex">
                <div className="flex space-x-3 text-black justify-center items-center">
                    <div className="flex space-x-1 flex-col justify-center items-center">
                        <span className="font-bold text-sm">🪐 Diámetro</span>
                        <span className="text-sm">{planet.diameter} km</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-bold text-sm">👥 Población</span>
                        <span>{planet.population}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetCard;
