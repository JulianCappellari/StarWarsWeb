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
      className="flex min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/imagen-difuminada.png')`,
      }}
    >
      <div className="bg-red-500 w-[800px] h-auto p-8 flex flex-col justify-center items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[12px]">
        <Link
          href="/planets"
          className="absolute top-6 left-10 hover:bg-red-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center"
        >
          <span className="text-white text-3xl text-center ">&larr;</span>
        </Link>
        <h1 className="text-white text-3xl font-bold mb-6 animate__animated animate__flipInX">
          {planet.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="flex flex-col">
            <span className="font-bold text-center">
              Información del planeta
            </span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">
                  Período de rotación:{" "}
                </span>
                <span className="text-gray-100">
                  {planet.rotation_period} horas
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Período orbital:{" "}
                </span>
                <span>{planet.orbital_period} días</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Diámetro: </span>
                <span>{planet.diameter} km</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Clima: </span>
                <span>{planet.climate}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Gravedad: </span>
                <span>{planet.gravity}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-center">Información adicional</span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">
                  Superficie de agua:{" "}
                </span>
                <span className="text-gray-100">{planet.surface_water}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Población: </span>
                <span>{planet.population}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Residentes: </span>
                <span>{residentsNames.join(", ") || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Películas: </span>
                <span>{filmsNames.join(", ") || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col ">
            <span className="font-bold text-center">
              Información de creación
            </span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">Creado en: </span>
                <span>{planet.created}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Última edición:{" "}
                </span>
                <span>{planet.edited}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
