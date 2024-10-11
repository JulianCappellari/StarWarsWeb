import { fetchMultipleResourceNames } from "@/src/actions/get-info";
import Link from "next/link";
import { getStarship } from "@/src/actions/starships/get-starships";

interface Props {
  params: {
    name: string;
  };
}

export default async function StarshipNamePage({ params }: Props) {
  const decodedName = decodeURIComponent(params.name);
  const starships = await getStarship(decodedName);
  const starship = starships.find(
    (s) => s.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!starship) {
    return (
      <div
        className="flex min-h-screen justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url('/imagen-difuminada.png')` }}
      >
        <h1 className="text-white text-3xl font-bold">Nave no encontrada</h1>
      </div>
    );
  }

  const pilotsNames = await fetchMultipleResourceNames(starship.pilots);

  const filmsNames = await fetchMultipleResourceNames(starship.films);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/imagen-difuminada.png')`,
      }}
    >
      <div className="bg-orange-500 w-full sm:w-[600px] md:w-[800px] h-auto p-4 sm:p-6 sm:mx-auto md:mx-0 mt-10 mb-10 flex flex-col justify-center items-center md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-[12px]">
        <Link
          href="/starships"
          className="absolute top-12 md:top-6 left-2 hover:bg-orange-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center"
        >
          <span className="text-white text-3xl text-center">&larr;</span>
        </Link>
        <h1 className="text-white text-3xl font-bold mb-6 animate__animated animate__flipInX">
          {starship.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">
              Información de la nave
            </span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Modelo: </span>
                <span className="text-gray-100">{starship.model}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Fabricante: </span>
                <span>{starship.manufacturer}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Costo: </span>
                <span>{starship.cost_in_credits} créditos</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Longitud: </span>
                <span>{starship.length} m</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">
                  Velocidad máxima:{" "}
                </span>
                <span>{starship.max_atmosphering_speed} km/h</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">
              Información adicional
            </span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Tripulación: </span>
                <span className="text-gray-100">{starship.crew}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Pasajeros: </span>
                <span>{starship.passengers}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">
                  Capacidad de carga:{" "}
                </span>
                <span>{starship.cargo_capacity} kg</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Consumibles: </span>
                <span>{starship.consumables}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">
              Clasificación y otros
            </span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Clasificación: </span>
                <span>{starship.starship_class}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">
                  Calificación de hipernave:{" "}
                </span>
                <span>{starship.hyperdrive_rating}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">MGLT: </span>
                <span>{starship.MGLT}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1 md:row-start-1">
            <span className="font-bold text-center mb-2">
              Información de creación
            </span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Creado en: </span>
                <span>{starship.created}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">
                  Última edición:{" "}
                </span>
                <span>{starship.edited}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Pilotos: </span>
                <span>{pilotsNames.join(", ") || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Películas: </span>
                <span>{filmsNames.join(", ") || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
