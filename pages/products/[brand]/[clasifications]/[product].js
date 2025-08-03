import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout1 from '@/components/Layout1'
import LoaderTruck from '@/components/LoaderQwen'
import Whatssapp from '@/components/Whatssapp'
import cards from '../../../../components/products/card.json';

export default function CardDetail() {
    const router = useRouter();
    const { brand, clasifications, product } = router.query;
    const [imagebrand, setImagebrand] = useState('https://res.cloudinary.com/dvy9qircy/image/upload/v1749639487/forex/forex_academy_professional_camionStd.jpg');
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [clasification, setClasification] = useState(null);

    useEffect(() => {
        if (!clasifications) return;
        // fetch('/cards.json')
        //   .then(res => res.json())
        //   .then(data => {
        //     const found = data.cards.find(c => c.id.toString() === id);
        //     setCard(found);
        //   });

        if (clasifications) setCard(clasifications)

        const fetchData = async () => {
            setLoading(true);
            // Aquí iría la llamada real a tu API o BD
            // Ejemplo: const res = await fetch(`/api/data/${id}`);
            // const result = await res.json();
            const resProducts = await fetch('/api/products/get');
        const productsData = await resProducts.json();

        const filtered = productsData.product.filter(card => card.brand === brand &&
            card.clasification.includes(clasifications) &&
            card._id == product);
       
            const imageB1 = cards.brands.filter(brand2 => brand2.text == brand)
            setImagebrand(imageB1[0].image)
            setData(filtered)
            const uniqueClasifications = [
                ...new Set(
                    filtered
                        .flatMap(card => card.clasification)
                )
            ];
            setClasification(uniqueClasifications)
            setLoading(false);

            // Simulación:
           /* setTimeout(() => {
                const filtered = cards.cards.filter(card => card.brand === brand &&
                    card.clasification.includes(clasifications) &&
                    card.id == product);
                //setData({ id, name: `Item ${id}` });
                const imageB1 = cards.brands.filter(brand2 => brand2.text == brand)
                setImagebrand(imageB1[0].image)
                setData(filtered)
                const uniqueClasifications = [
                    ...new Set(
                        filtered
                            .flatMap(card => card.clasification)
                    )
                ];
                setClasification(uniqueClasifications)
                setLoading(false);
            }, 1900);*/
        };

        fetchData();
    }, [clasifications]);

    if (!card) return <div>Cargando...</div>;

    return (
        <div>
            <Layout1>
                <Whatssapp />
                <p className='pt-2'>{card.description}</p>
                {data && data[0] ? <div>
                    <div className='flex justify-center items-center gap-16'>
                        <img src={imagebrand} alt={card.title} className="my-0 border-0 w-auto h-40 max-w-md" />
                        <h1 className="flex justify-center text-black  text-3xl font-bold">{clasifications}</h1>
                    </div>

                    {/* <h1>Detalle del Item</h1>
<p>ID: {data[0].id}</p>
<p>Nombre: {data[0].title}</p> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-8 gap-4">
                        {data?.map((class2, index) =>

                            <div key={index} className="border rounded-xl p-4  shadow-md">

                                <img src={class2.image[0]} alt={class2.title} className="w-auto  object-cover rounded" />
                                <h2 className="text-xl font-bold mt-2">{class2.title}</h2>


                                {/* Ver más */}

                            </div>
                        )
                        }
                        <div>
                            {data[0].cardDetail}
                        </div>
                    </div>
                </div>

                    :
                    /**  Si no existe ninguna Card Mapeo esta */
                    <div className="w-screen pr-50 h-64 border-0 flex items-center justify-center">
                        <LoaderTruck />
                    </div>}

            </Layout1>
        </div>
    );
}
