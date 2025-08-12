const BannerCasaDelTwingo = () => {
    return (
      <div id='Inicio' className="bg-yellowPrimary flex flex-col-reverse md:flex-row items-center justify-between px-4 py-8 md:py-12 mt-20 rounded-lg shadow-lg max-w-7xl mx-auto">
        {/* Texto del mensaje */}
        <div className="md:pl-6 lg:pl-6 w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
  <h2 className="text-2xl md:text-4xl font-bold text-gray-100 leading-tight">
       {/* Donde termina la búsqueda, empieza el camino. */}
       La Casa del Tren Renault.
  </h2>
  <p className="mt-2 text-lg  text-gray-700">
  En <strong>La Casa del Tren Renault</strong> somos especialistas 
  en <strong>diagnóstico, reparación y provisión de repuestos</strong> para el tren
  delantero de toda la línea Renault.
 
  </p>
  <p className="mt-4 text-gray-700 text-base md:text-lg">
     En <strong> La Casa del Tren Renault</strong>  ofrecemos soluciones completas para 
      <strong> Clio, Logan, Sandero, Kangoo, Symbol, Megane, Duster y más. </strong>  
      Como cuidamos a tu vehiculo como nadie tenemos el servicio de 
      <strong> Escaner gratuito.</strong>
  </p>
</div>
  
        {/* Imagen del camión */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
           // src="https://res.cloudinary.com/dvy9qircy/image/upload/v1748861153/forex/forex_academy_professional_twingo1.jpg"
           src="https://res.cloudinary.com/dnrkfwzwp/image/upload/v1751928337/Shiva_Camiones_megane.webp"
            alt="Vehiculo "
            className="w-70 md:w-92 h-auto object-contain rounded-lg shadow-lg "
          />
        </div>
      </div>
    );
  };
  
  export default BannerCasaDelTwingo;
  