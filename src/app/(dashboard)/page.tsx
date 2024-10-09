// src/pages/index.tsx

import Button from "@/src/components/dashboard/Button";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/image-dashborad.jpg')` }} 
    >
      <div className="bg-slate-800/80 text-white p-6 md:p-8 rounded-lg shadow-lg shadow-slate-600 flex flex-col items-center justify-center space-y-4 md:space-y-6 max-w-[700px] w-full mx-4 md:mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          Bienvenido a la API de Star Wars
        </h1>
        <p className="text-center">
          Explora la información sobre las entidades de Star Wars.
        </p>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <Button title="Personajes" link="/people" />
          <Button title="Peliculas" link="/films" />
          <Button title="Planetas" link="/planets" />
          <Button title="Naves" link="/starships" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
