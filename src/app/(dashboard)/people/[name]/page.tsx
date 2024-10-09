import {
  fetchMultipleResourceNames,
  fetchResourceName,
} from "@/src/actions/get-info";
import { getPeople } from "@/src/actions/people/get-people";
import Link from "next/link";


interface Props {
  params: {
    name: string;
  };
}

export default async function PeopleNamePage({ params }: Props) {
  const decodedName = decodeURIComponent(params.name);
  const people = await getPeople(decodedName);
  const person = people.find(
    (p) => p.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!person) {
    return (
      <div
        className="flex min-h-screen justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url('/imagen-difuminada.png')` }}
      >
        <h1 className="text-white text-3xl font-bold">Persona no encontrada</h1>
      </div>
    );
  }

  
  const homeworldName = await fetchResourceName(person.homeworld);
  const filmsNames = await fetchMultipleResourceNames(person.films);
  const speciesNames = await fetchMultipleResourceNames(person.species);
  const vehiclesNames = await fetchMultipleResourceNames(person.vehicles);
  const starshipsNames = await fetchMultipleResourceNames(person.starships);

  return (
    <div
      className="flex min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/imagen-difuminada.png')`,
      }}
    >
      <div className="bg-blue-500 w-[800px] h-auto p-8 flex flex-col justify-center items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[12px] ">
        <Link
          href="/people"
          className="absolute top-6 left-10 hover:bg-blue-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center"
        >
          <span className="text-white text-3xl text-center">&larr;</span>{" "}
          
        </Link>
        <h1 className="text-white text-3xl font-bold mb-6 animate__animated animate__flipInX">{person.name}</h1>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="flex flex-col">
            <span className="font-bold text-center">Información personal</span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">Altura: </span>
                <span className="text-gray-100">{person.height} cm</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Peso: </span>
                <span>{person.mass} kg</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Color de cabello:{" "}
                </span>
                <span>{person.hair_color}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Color de piel: </span>
                <span>{person.skin_color}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Color de ojos: </span>
                <span>{person.eye_color}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-center">Información adicional</span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">
                  Año de nacimiento:{" "}
                </span>
                <span className="text-gray-100">{person.birth_year}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Género: </span>
                <span>{person.gender}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Planeta de origen:{" "}
                </span>
                <span>{homeworldName}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">Películas: </span>
                <span>{filmsNames.join(", ")}</span>
              </div>
              <div>
                <span className="font-bold">Especies: </span>
                <span>{speciesNames.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col ">
            <span className="font-bold text-center">
              Vehículos y naves espaciales
            </span>
            <div className="border-b border-gray-300"></div>
            <div className="flex flex-col mt-2">
              <div>
                <span className="font-bold text-gray-100">Vehículos: </span>
                <span>{vehiclesNames.join(", ") || "N/A"}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Naves espaciales:{" "}
                </span>
                <span>{starshipsNames.join(", ") || "N/A"}</span>
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
                <span>{person.created}</span>
              </div>
              <div>
                <span className="font-bold text-gray-100">
                  Última edición:{" "}
                </span>
                <span>{person.edited}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
