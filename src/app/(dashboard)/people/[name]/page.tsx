import { fetchMultipleResourceNames, fetchResourceName } from "@/src/actions/get-info"; 
import { getPeople } from "@/src/actions/people/get-people"; 
import Link from "next/link";

interface Props { 
  params: { name: string; }; 
}

export default async function PeopleNamePage({ params }: Props) { 
  const decodedName = decodeURIComponent(params.name); 
  const people = await getPeople(decodedName); 
  const person = people.find((p) => p.name.toLowerCase() === decodedName.toLowerCase());

  if (!person) { 
    return ( 
      <div className="flex min-h-screen justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(/imagen-difuminada-compress.webp)' }}> 
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
    <div className="flex flex-col min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/imagen-difuminada-compress.webp)' }}> 
      <div className="bg-blue-500 w-full sm:w-[600px] md:w-[800px] h-auto p-4 sm:p-6 sm:mx-auto md:mx-0 mt-10 mb-10 flex flex-col justify-center items-center md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2  md:-translate-y-1/2 rounded-[12px]">

        <Link href="/people" className="absolute top-12 md:top-6 left-6 hover:bg-blue-600 transition-shadow rounded-full px-3 py-2 flex items-center justify-center"> 
          <span className="text-white text-2xl">←</span> 
        </Link>
        
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6 animate__animated animate__flipInX">{person.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-white text-lg animate__animated animate__flipInX">
          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">Información personal</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Altura: </span>
                <span className="text-gray-100">{person.height} cm</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Peso: </span>
                <span>{person.mass} kg</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Color de cabello: </span>
                <span>{person.hair_color}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Color de piel: </span>
                <span>{person.skin_color}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Color de ojos: </span>
                <span>{person.eye_color}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">Información adicional</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Año de nacimiento: </span>
                <span className="text-gray-100">{person.birth_year}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Género: </span>
                <span>{person.gender}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Planeta de origen: </span>
                <span>{homeworldName}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Películas: </span>
                <span>{filmsNames.join(", ")}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold">Especies: </span>
                <span>{speciesNames.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1">
            <span className="font-bold text-center mb-2">Vehículos y naves espaciales</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Vehículos: </span>
                <span>{vehiclesNames.join(", ") || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Naves espaciales: </span>
                <span>{starshipsNames.join(", ") || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:col-span-1 md:row-start-1">
            <span className="font-bold text-center mb-2">Información de creación</span>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="font-bold text-gray-100">Creado en: </span>
                <span>{person.created}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold text-gray-100">Última edición: </span>
                <span>{person.edited}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}
