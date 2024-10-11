"use client";
import TopMenu from "@/src/components/dashboard/TopMenu";
import PlanetCard from "@/src/components/planets/PlanetCard";
import { getPlanets } from "../../../actions/planets/get-planets";
import { useEffect, useState } from "react";
import { IPlanet } from "@/src/interfaces/IPlanet";
import {
  Pagination,
  PaginationItem,
  PaginationList,
  PaginationNavigator,
} from "keep-react";
import { CaretLeft, CaretRight } from "phosphor-react";

const ITEMS_PER_PAGE = 5; 

export default function PlanetsPage() {
  const [planetsData, setPlanetsData] = useState<IPlanet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await getPlanets();
      setPlanetsData(data);
    }
    fetchData();
  }, []);


  const filteredPlanets = planetsData.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

 
  const totalPages = Math.ceil(filteredPlanets.length / ITEMS_PER_PAGE);

  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPlanets = filteredPlanets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
          <h1 className="text-3xl font-bold text-white mb-6">Planetas</h1>

          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar planetas..."
              className="p-2 rounded text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-[102px] gap-x-10 justify-center items-center mt-6 md:mt-[90px] animate__animated animate__zoomIn animate__delay-0.3s">
            {currentPlanets.map((planet, index) => ( 
              <PlanetCard key={index} planet={planet} />
            ))}
          </div>

         
          <div className="flex justify-center mt-[110px]">
            <Pagination shape="rounded">
              <PaginationNavigator
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <CaretLeft size={18} />
                Anterior
              </PaginationNavigator>
              <PaginationList>
                {Array.from({ length: totalPages }, (_, index) => {
                  const isActive = currentPage === index + 1;
                  return (
                    <PaginationItem
                      key={index}
                      active={isActive}
                      className={isActive ? "text-red-500" : "text-gray-300"} 
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationItem>
                  );
                })}
              </PaginationList>
              <PaginationNavigator
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Siguiente
                <CaretRight size={18} />
              </PaginationNavigator>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
