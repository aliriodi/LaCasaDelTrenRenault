import React from 'react'

function Card3() {
    const cards = [
        {
            id: 1,
            title: "Disponibilidad Inmediata:",
            image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748911157/forex/forex_academy_professional_disponibilidadInmediataTWINGO.png",
            description: "Contamos con stock constante de piezas claves para mantener tu <strong>Reanult</strong> siempre en marcha.",
            style: 'STATIC',
        },
        {
            id: 2,
            title: "Confianza que Rueda:",
            image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748910066/forex/forex_academy_professional_CONFIANZAQUERUEDA3.png",
            description: "Clientes de todo el país nos eligen por nuestra seriedad, responsabilidad y atención cercana.",
            style: 'MOVE',
        },
        {
            id: "Servicios",
            //title: "Una Comunidad Twingo:",
            title: "Una Comunidad Reanult:",
            image: "https://res.cloudinary.com/dvy9qircy/image/upload/v1748905931/forex/forex_academy_professional_FAMILYTWINGO.jpg",
            description: "Más que un negocio, somos parte de una comunidad que ama y cuida sus <strong>Reanult</strong> como familia.",
            style: 'STATIC',
        },
    ];
    return (
        <div>
            <div className='pt-6'>
                <h2 className="text-2xl md:text-4xl font-bold text-gris-suave  leading-tight">
                    <div className='flex   bg-yellowPrimary  justify-center p-6  rounded-xl'>
                        ¿POR QUE ELEGIRNOS?</div></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        id={card.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:scale-105"
                    >
                        <img
                            src={card.image}
                            alt={card.id}
                            className={`w-full h-auto object-cover ${card.style === 'MOVE' ? 'animate-move-x' : ''
                                }`}
                        />

                        <div className="p-4">
                            <h2 className="text-green-950 text-xl font-bold mb-2">{card.title}</h2>
                            <p className="text-gray-600"
                                dangerouslySetInnerHTML={{ __html: card.description }}>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Card3