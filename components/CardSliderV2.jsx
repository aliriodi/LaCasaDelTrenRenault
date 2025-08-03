import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Calidad Garantizada:",
    image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748722749/forex/forex_academy_professional_100QAv2.jpg",
    description: "Trabajamos directamente con <strong>Renault</strong> para asegurarnos de que obtengas solo lo mejor.",
    imagebg: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748862295/forex/forex_academy_professional_twingoCardSlider5.jpg",
  },
  {
    id: 2,
    title: "Asesoría Especializada:",
    image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748865660/forex/forex_academy_professional_twingo5.png",
    description: "Nuestro equipo de expertos está listo para ayudarte a encontrar la pieza perfecta para tus necesidades.",
    imagebg: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748862588/forex/forex_academy_professional_twingoCardSlider.jpg",
  },
  {
    id: "3",
    title: "Precios Competitivos:",
    image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748867271/forex/forex_academy_professional_repuestosTwingo.jpg",
    description: "Ofrecemos los mejores precios del mercado. Tu <strong>Renault</strong> esta en buenas manos.",
    imagebg: "https://res.cloudinary.com/dnrkfwzwp/image/upload/v1751930200/Shiva_Camiones_clio2.jpg",
  },
];


const CardSlider = () => {
  const [current, setCurrent] = useState(0);
  const [current2, setCurrent2] = useState(0);
  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % cards.length);
  };
  const nextCard2 = () => {
    setCurrent2((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    const interval2 = setInterval(nextCard2, 10000);
    return () => {
                  clearInterval(interval);
                  clearInterval(interval2);
                 }
  }, []);

  return (
    <div className="relative overflow-hidden h-[400px] flex items-center justify-center">
      {/* Fondo animado dinámico */}
      <div
        className="absolute inset-0 animate-backgroundMove bg-repeat-x bg-[length:auto_100%]  rounded-xl"
        style={{ backgroundImage: 
            
             `url('${cards[current2].imagebg}')` 
            //`url('https://res.cloudinary.com/dvy9qircy/image/upload/v1748862295/forex/forex_academy_professional_twingoCardSlider7.jpg')`
        }}
      />

      {/* Tarjeta */}
      <div className="relative z-10 w-[90%] max-w-5xl flex items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={cards[current].image}
          alt={cards[current].title}
          className="w-64 h-auto object-cover hidden md:block"
        />
        <div className="p-6 text-left">
          <h2 className="text-green-950 text-2xl font-bold mb-2">{cards[current].title}</h2>
          <p className="text-gray-700 text-base"
             dangerouslySetInnerHTML={{ __html: cards[current].description }}>
          
            {/* {cards[current].description} */}
            </p>
        </div>
      </div>

      {/* Flechas */}
      <div className="hidden md:block">
      <button
        onClick={prevCard}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellowPrimary text-white p-2 rounded-full shadow hover:bg-yellowThirth z-20 "
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={nextCard}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellowPrimary text-white p-2 rounded-full shadow hover:bg-yellowThirth z-20"
      >
        <ArrowRight size={20} />
      </button></div>
    </div>
  );
};

export default CardSlider;
