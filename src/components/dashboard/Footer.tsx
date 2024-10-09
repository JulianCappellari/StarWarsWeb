// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center bottom-0 ">
      <p>&copy; {new Date().getFullYear()} StarWras Website. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
