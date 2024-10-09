'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

const items = [
  { label: 'Personajes', link: '/people' },
  { label: 'Películas', link: '/films' },
  { label: 'Naves', link: '/starships' },
  { label: 'Planetas', link: '/planets' },
];
const TopMenu: React.FC = () => {
  const pathname = usePathname(); 
  const [activeIndex, setActiveIndex] = useState(0);


  
  useEffect(() => {
    const index = items.findIndex(item => item.link === pathname); 
    setActiveIndex(index !== -1 ? index : 0); 
  }, [pathname]); 

  return (
    <nav className="bg-gray-400 text-gray-300 rounded-lg">
      <div className="hidden md:blockabsolute left-4 top-12 transform -translate-y-1/2">
        <Link href="/" className="px-4 py-2 cursor-pointer text-white underline hover:text-gray-400">
          Inicio
        </Link>
      </div>
      <div className="flex justify-around p-4 relative">
        {items.map((item, index) => (
          <div key={index} className="relative">
            <Link href={item.link} className="px-4 py-2 cursor-pointer text-white" onClick={() => setActiveIndex(index)}>
              {item.label}
            </Link>
            {activeIndex === index && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[60%] h-[3px] bg-black -bottom-1" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default TopMenu;
