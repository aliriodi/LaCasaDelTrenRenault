// components/LoaderQwen.jsx
import React from 'react';

export default function Loader() {
  return (
    <div className="flex  items-center justify-center min-h-[80vh]">
      {/* <h2 className="text-xl font-semibold mb-4">Cargando...</h2> */}

      {/* Contenedor de la imagen con animación */}
      <div className="animate-spin-custom relative w-40 h-auto">
        <img
          src="https://res.cloudinary.com/dnrkfwzwp/image/upload/v1755437664/La_casa_del_tren_Renaultlacasadelrenaultwobg.png" 
          alt="Logo rotando"
          className="w-full h-auto"
        />
      </div>

      {/* <p className="mt-4 text-gray-500">Por favor espere...</p> */}
    </div>
  );
}