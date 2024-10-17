"use client";
import TopMenu from "@/src/components/dashboard/TopMenu";
import { useState } from "react";
import { getStarship } from "@/src/actions/starships/get-starships";
import StarshipCard from "@/src/components/startships/StarshipCard";

import PaginationComponent from "@/src/components/PaginationComponent";
import { useData } from "@/src/hook/useData";

const ITEMS_PER_PAGE = 5; 

export default function StarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    loading,
    currentData: currentStarships,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useData(getStarship, searchTerm, ITEMS_PER_PAGE);
  return (
    <div
      className="flex min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/imagen-difuminada-compress.webp')`,
      }}
    >
      
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg" />

      <div className="flex flex-col items-center justify-start w-full z-10 md:p-6 absolute md:top-10">
        <TopMenu />

        <div className="mt-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-6">Naves</h1>

          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar naves..."
              className="p-2 rounded text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-[102px] gap-x-10 justify-center items-center mt-6 md:mt-[90px] animate__animated animate__zoomIn animate__delay-.5s">
            {currentStarships.map((starship, index) => (
              <StarshipCard key={index} starship={starship} />
            ))}
          </div>

          
          {!loading && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              color="orange"
            />
          )}
        </div>
      </div>
    </div>
  );
}
