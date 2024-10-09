"use client";
import TopMenu from "@/src/components/dashboard/TopMenu";
import PersonCard2 from "@/src/components/people/PersonCard2";
import { getPeople } from "../../../actions/people/get-people";
import { useEffect, useState } from "react";
import { IPeople } from "@/src/interfaces/IPeople";
import {
  Pagination,
  PaginationItem,
  PaginationList,
  PaginationNavigator,
} from "keep-react";
import { CaretLeft, CaretRight } from "phosphor-react";

const ITEMS_PER_PAGE = 5; 

export default function PeoplePage() {
  const [peopleData, setPeopleData] = useState<IPeople[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await getPeople();
      setPeopleData(data);
    }
    fetchData();
  }, []);

  
  const filteredPeople = peopleData.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const totalPages = Math.ceil(filteredPeople.length / ITEMS_PER_PAGE);

  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPeople = filteredPeople.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div
      className="flex min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/imagen-difuminada.png')`,
      }}
    >
      
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg h-auto" />

      <div className="flex flex-col items-center justify-start w-full z-10 md:p-6 absolute md:top-10">
        <TopMenu />

        <div className="mt-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Personajes
          </h1>

          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar personajes..."
              className="p-2 rounded text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-[102px] gap-x-10 justify-center items-center md:mt-[90px] animate__animated animate__zoomIn animate__delay-0.3s">
            {currentPeople.map((person, index) => (
              <PersonCard2 key={index} person={person} />
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
                      className={isActive ? "text-blue-500" : "text-gray-300"} 
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
