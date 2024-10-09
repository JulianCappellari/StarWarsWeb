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
      className="flex min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/imagen-difuminada.png')`,
      }}
    >
      <div className="bg-orange-500 w-[800px] h-auto p-8 flex flex-col justify-center items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[12px]">
        <Link
          href="/starships"
          className="absolute top-6 left-10 hover:bg-orange-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center"
        >
          <span className="text-white text-3xl text-center ">&larr;</span>{" "}
          
        </Link>
        <h1 className="text-white text-3xl font-bold mb-6  animate__animated animate__flipInX">
          {starship.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="flex flex-col">
            <span className="font-bold text-center">
              Información de la nave
            </span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">Modelo: </span>
                <span className="text-gray-100">{starship.model}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Fabricante: </span>
                <span>{starship.manufacturer}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Costo: </span>
                <span>{starship.cost_in_credits} créditos</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Longitud: </span>
                <span>{starship.length} m</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Velocidad máxima:{" "}
                </span>
                <span>{starship.max_atmosphering_speed} km/h</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-center">Información adicional</span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">Tripulación: </span>
                <span className="text-gray-100">{starship.crew}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Pasajeros: </span>
                <span>{starship.passengers}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Capacidad de carga:{" "}
                </span>
                <span>{starship.cargo_capacity} kg</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Consumibles: </span>
                <span>{starship.consumables}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-center">Clasificación y otros</span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">Clasificación: </span>
                <span>{starship.starship_class}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Calificación de hipernave:{" "}
                </span>
                <span>{starship.hyperdrive_rating}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">MGLT: </span>
                <span>{starship.MGLT}</span>
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
                <span>{starship.created}</span>
              </div>
              <div>
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
