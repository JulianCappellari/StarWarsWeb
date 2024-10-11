import { fetchMultipleResourceNames } from "@/src/actions/get-info";
import { getFilms } from "@/src/actions/films/get-film";
import Link from "next/link";

interface Props {
  params: { title: string };
}

export default async function FilmPage({ params }: Props) {
  const decodedTitle = decodeURIComponent(params.title);
  const films = await getFilms(decodedTitle);
  const film = films.find((p) => p.title.toLowerCase() === decodedTitle.toLowerCase());

  if (!film) {
    return (
      <div
        className="flex min-h-screen justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/imagen-difuminada.png)' }}
      >
        <h1 className="text-white text-3xl font-bold">Película no encontrada</h1>
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
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/imagen-difuminada.png)' }}
    >
      <div className="bg-green-500 w-full sm:w-[600px] md:w-[800px] h-auto p-4 sm:p-6 sm:mx-auto md:mx-0 mt-10 mb-10 flex flex-col justify-center items-center md:absolute md:left-1/2 md:top-[430px] md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-[12px]">
        <Link
          href="/films"
          className="absolute top-12 md:top-6 left-6 hover:bg-green-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center"
        >
          <span className="text-white text-2xl">←</span>
        </Link>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6 animate__animated animate__flipInX">
          {film.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">Información de la película</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">ID de episodio: </span>
                <span className="text-gray-100">{film.episode_id}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Director: </span>
                <span className="text-gray-100">{film.director}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Productor: </span>
                <span className="text-gray-100">{film.producer}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Fecha de lanzamiento: </span>
                <span className="text-gray-100">{film.release_date}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">Detalles adicionales</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Personajes: </span>
                <span>{charactersNames.join(", ") || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Planetas: </span>
                <span>{planetsNames.join(", ") || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Naves espaciales: </span>
                <span>{starshipsNames.join(", ") || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Vehículos: </span>
                <span>{vehiclesNames.join(", ") || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Especies: </span>
                <span>{speciesNames.join(", ") || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información de creación */}
        <div className="flex flex-col mt-4">
          <span className="font-bold text-center mb-2">Información de creación</span>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="font-bold text-gray-100">Creado en: </span>
              <span>{film.created}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-gray-100">Última edición: </span>
              <span>{film.edited}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
