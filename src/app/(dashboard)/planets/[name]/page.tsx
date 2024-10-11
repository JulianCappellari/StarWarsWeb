import { fetchMultipleResourceNames } from "@/src/actions/get-info";
import { getPlanets } from "@/src/actions/planets/get-planets";
import Link from "next/link";

interface Props {
  params: {
    name: string;
  };
}

export default async function PlanetNamePage({ params }: Props) {
  const decodedName = decodeURIComponent(params.name);
  const planets = await getPlanets(decodedName);
  const planet = planets.find(
    (p) => p.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!planet) {
    return (
      <div
        className="flex min-h-screen justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url('/imagen-difuminada.png')` }}
      >
        <h1 className="text-white text-3xl font-bold">Planeta no encontrado</h1>
      </div>
    );
  }

  const residentsNames = await fetchMultipleResourceNames(planet.residents);
  const filmsNames = await fetchMultipleResourceNames(planet.films);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('/imagen-difuminada.png')` }}
    >
      <div className="bg-red-500 w-full sm:w-[600px] md:w-[800px] h-auto p-4 sm:p-6 sm:mx-auto md:mx-0 mt-10 mb-10 flex flex-col justify-center items-center md:absolute md:left-1/2 md:top-[430px] md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-[12px]">
        <Link
          href="/planets"
          className="absolute top-12 md:top-6 left-6 hover:bg-red-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center"
        >
          <span className="text-white text-2xl">←</span>
        </Link>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6 animate__animated animate__flipInX">
          {planet.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">Información del planeta</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Período de rotación: </span>
                <span className="text-gray-100">{planet.rotation_period} horas</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Período orbital: </span>
                <span>{planet.orbital_period} días</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Diámetro: </span>
                <span>{planet.diameter} km</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Clima: </span>
                <span>{planet.climate}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Gravedad: </span>
                <span>{planet.gravity}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">Información adicional</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Superficie de agua: </span>
                <span className="text-gray-100">{planet.surface_water}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Población: </span>
                <span>{planet.population}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Residentes: </span>
                <span>{residentsNames.join(", ") || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Películas: </span>
                <span>{filmsNames.join(", ") || "N/A"}</span>
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
              <span>{planet.created}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-gray-100">Última edición: </span>
              <span>{planet.edited}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
