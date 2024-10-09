import {
  fetchMultipleResourceNames,
} from "@/src/actions/get-info";
import { getFilms } from "@/src/actions/films/get-film";
import Link from "next/link";

interface Props {
  params: {
    title: string; 
  };
}

export default async function FilmPage({ params }: Props) {
  const decodedTitle = decodeURIComponent(params.title);
  const films = await getFilms(decodedTitle);
  const film = films.find(
    (p) => p.title.toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!film) {
    return (
      <div
        className="flex min-h-screen justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url('/imagen-difuminada.png')` }}
      >
        <h1 className="text-white text-3xl font-bold">
          Película no encontrada
        </h1>
      </div>
    );
  }

 
  const charactersNames = await fetchMultipleResourceNames(film.characters);
  const planetsNames = await fetchMultipleResourceNames(film.planets);
  const starshipsNames = await fetchMultipleResourceNames(film.starships);
  const vehiclesNames = await fetchMultipleResourceNames(film.vehicles);
  const speciesNames = await fetchMultipleResourceNames(film.species);

  return (
    <div
      className="flex min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/imagen-difuminada.png')`,
      }}
    >
      <div className="bg-green-500 md:w-[800px] h-auto p-8 flex flex-col justify-center items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[12px]">
        <Link
          href="/films"
          className="absolute top-6 left-10 hover:bg-green-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center "
        >
          <span className="text-white text-3xl text-center">&larr;</span>{" "}
          
        </Link>
        <h1 className="text-white text-3xl font-bold mb-6 animate__animated animate__flipInX">{film.title}</h1>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-bold text-center">
                Información de la película
              </span>
              <div className="border-b border-gray-300"></div>
              <div className="flex flex-col mt-2">
                <div>
                  <span className="font-bold text-gray-100">
                    ID de episodio:{" "}
                  </span>
                  <span className="text-gray-100">{film.episode_id}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-100">Director: </span>
                  <span className="text-gray-100">{film.director}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-100">Productor: </span>
                  <span className="text-gray-100">{film.producer}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-100">
                    Fecha de lanzamiento:{" "}
                  </span>
                  <span className="text-gray-100">{film.release_date}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-center">
                Información de creación
              </span>
              <div className="border-b border-gray-300"></div>
              <div className="flex flex-col mt-2">
                <div>
                  <span className="font-bold text-gray-100">Creado en: </span>
                  <span>{film.created}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-100">
                    Última edición:{" "}
                  </span>
                  <span>{film.edited}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-center">Detalles adicionales</span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">Personajes: </span>
                <span>{charactersNames.join(", ") || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Planetas: </span>
                <span>{planetsNames.join(", ") || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Naves espaciales:{" "}
                </span>
                <span>{starshipsNames.join(", ") || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Vehículos: </span>
                <span>{vehiclesNames.join(", ") || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Especies: </span>
                <span>{speciesNames.join(", ") || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
