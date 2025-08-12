import React, { useState } from 'react';

function Rifa() {
  const images: string[] = [
    'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271709/La_casa_del_tren_RenaultSOMBRERO.webp',
    'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271765/La_casa_del_tren_RenaultArepa.jpg',
    'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271786/La_casa_del_tren_RenaultBandera.jpg',
    'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271813/La_casa_del_tren_Renaulttostonxito.png',
    'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754958299/La_casa_del_tren_RenaultBANDERAS1RIFA.jpg'
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDraw = () => {
    const randomIndex = Math.floor(Math.random() * (images.length));
    setSelectedImage(images[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6 p-4">
      {!selectedImage && <><h1 className="text-2xl font-bold text-yellow-600">🎯 Rifa Venezolana</h1>

        <button
          onClick={handleDraw}
          className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
        >
          ¡Sacar una imagen!
        </button>
      </>
      }
      {selectedImage && (
        <div className="w-72 h-auto rounded-xl shadow-xl bg-white overflow-hidden">
          <img
            src={selectedImage}
            alt="Resultado de la rifa"
            className="w-full h-auto object-cover"
          />
          <div className="flex justify-center w-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
            >
              Hacer Otra Rifa!!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rifa;

// import React from 'react'

// function rifa() {
//     let images = ['https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271709/La_casa_del_tren_RenaultSOMBRERO.webp',
//         'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271765/La_casa_del_tren_RenaultArepa.jpg',
//         'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271786/La_casa_del_tren_RenaultBandera.jpg',
//         'https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754271813/La_casa_del_tren_Renaulttostonxito.png']
//     return (
//         <div>
//             <div className="flex justify-center">
//                 <div className="flex flex-wrap justify-center gap-4 p-4 max-w-6xl">
//                     {images.map((ima, index) =>
//                         <div key={index} className="w-64 h-auto rounded-xl  shadow-lg overflow-hidden bg-white">
//                             <img src={ima} alt='index' key={index}
//                                 className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105" />
//                         </div>)}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default rifa