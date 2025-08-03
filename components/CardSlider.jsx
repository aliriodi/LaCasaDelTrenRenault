import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; // opcional, para íconos bonitos

const cards =  [
    {
        id: 1,
        title: "Calidad Garantizada:",
        image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748722749/forex/forex_academy_professional_100QAv2.jpg",
        description: "Trabajamos con los mejores fabricantes para asegurarnos de que obtengas solo lo mejor.",
    },
    {
        id: 2,
        title: "Asesoría Especializada:",
        image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748721630/forex/forex_academy_professional_camion2-shiva.jpg",
        description: "Nuestro equipo de expertos está listo para ayudarte a encontrar la pieza perfecta para tus necesidades.",
    },
    {
        id: "Servicios",
        title: "Precios Competitivos:",
        image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748723280/forex/forex_academy_professional_precioscompetitivos.jpg",
        description: "Ofrecemos los mejores precios del mercado.",
    },
];

const CardSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Autoplay cada 2 segundos
  useEffect(() => {
    const interval = setInterval(nextCard, 6000);
    return () => clearInterval(interval); // limpia el intervalo al desmontar
  }, []);

  return (
    // <div className="relative max-w-md mx-auto mt-10">
     <div className="relative w-full h-auto mt-10"> 
      {/* Card actual */}
      <div className="flex items-center text-center bg-white rounded-2xl shadow-xl overflow-hidden ">
        <div className="pl-40">
            <img
          src={cards[current].image}
          alt={cards[current].title}
          className=" w-64 h-auto object-cover"
        />
        </div>
        <div className="">
          <h2 className="text-green-950 text-xl font-bold mb-2">{cards[current].title}</h2>
          <p className="w-150 text-gray-600">{cards[current].description}</p>
        </div>
      </div>

      {/* Flechas */}
      <button
        onClick={prevCard}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-yellowPrimary p-2 rounded-full shadow hover:bg-yellowThirth"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={nextCard}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellowPrimary p-2 rounded-full shadow hover:bg-yellowThirth"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default CardSlider;
