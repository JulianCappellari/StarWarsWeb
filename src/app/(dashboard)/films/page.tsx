"use client";
import TopMenu from "@/src/components/dashboard/TopMenu";
import FilmCard from "@/src/components/film/FilmCard";
import { getFilms } from "@/src/actions/films/get-film";
import LoadingCard from "@/src/components/LoadingCard";
import { useData } from "@/src/hook/useData";
import { useState } from "react";
import PaginationComponent from "@/src/components/PaginationComponent";

const ITEMS_PER_PAGE = 5;

export default function FilmsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    loading,
    currentData: currentFilms,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useData(getFilms, searchTerm, ITEMS_PER_PAGE);

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
          <h1 className="text-3xl font-bold text-white mb-6">Películas</h1>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar películas..."
              className="p-2 rounded text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-[102px] gap-x-10 justify-center items-center mt-6 md:mt-[90px] animate__animated animate__zoomIn animate__delay-0.3s">
            {loading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <LoadingCard key={index} />
                ))
              : currentFilms.map((film, index) => (
                  <FilmCard key={index} film={film} />
                ))}
          </div>

          {!loading && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              color="green"
            />
          )}
        </div>
      </div>
    </div>
  );
}
