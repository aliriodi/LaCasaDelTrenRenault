// components/LoaderQwen.jsx
import React from 'react';

export default function LoaderTruck() {
  return (
    <div className="flex  items-center justify-center min-h-[80vh]">
      {/* <h2 className="text-xl font-semibold mb-4">Cargando...</h2> */}

      {/* Contenedor de la imagen con animación */}
      <div className="animate-spin-custom relative w-40 h-auto">
        <img
          src="https://res.cloudinary.com/dvy9qircy/image/upload/v1748858266/forex/forex_academy_professional_logo-casatwingov2.png" 
          alt="Logo rotando"
          className="w-full h-auto"
        />
      </div>

      {/* <p className="mt-4 text-gray-500">Por favor espere...</p> */}
    </div>
  );
}