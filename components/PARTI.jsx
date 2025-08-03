const BannerCasaDelTwingo = () => {
    return (
      <div id='Inicio' className="bg-yellowPrimary flex flex-col-reverse md:flex-row items-center justify-between px-4 py-8 md:py-12 mt-20 rounded-lg shadow-lg max-w-7xl mx-auto">
        {/* Texto del mensaje */}
        <div className="md:pl-6 lg:pl-6 w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
  <h2 className="text-2xl md:text-4xl font-bold text-gray-100 leading-tight">
       {/* Donde termina la búsqueda, empieza el camino. */}
       La Casa del Twingo: especialistas en Renault.
  </h2>
  <p className="mt-2 text-lg font-semibold text-gray-700">
    {/* Todo para tu Twingo, en un solo lugar. */}
    Aunque empezamos con el Twingo, hoy ofrecemos mucho más. 
  </p>
  <p className="mt-4 text-gray-700 text-base md:text-lg">
    {/* En <strong>La Casa del Twingo</strong>, somos especialistas. Más de <strong>10 años de experiencia</strong> ofreciendo <strong>repuestos, accesorios y asesoramiento</strong> exclusivo para Renault Twingo. Conocemos cada detalle de tu auto, porque es nuestra pasión. */}
    En <strong> La Casa del Twingo</strong>  encontrarás 
    repuestos y accesorios seleccionados para toda la línea Renault:  <strong>Clio, Logan, 
    Symbol, Megane y más.</strong>  Conocemos cada detalle de tu auto, 
    porque es nuestra pasión.     
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
  