import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout1 from '@/components/Layout1'
import LoaderTruck from '@/components/LoaderQwen'
import Whatssapp from '@/components/Whatssapp'
import cards from '../../../../components/products/card.json';
import ClearCart from '@/components/context/Clear';
import { useCart } from '@/components/context/CartContext';


export default function CardDetail() {
    const router = useRouter();
    const { brand, clasifications, product } = router.query;

    const [imagebrand, setImagebrand] = useState('https://res.cloudinary.com/dvy9qircy/image/upload/v1749639487/forex/forex_academy_professional_camionStd.jpg');
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [clasification, setClasification] = useState(null);

    const { addItem, getQty } = useCart(); // 👈 usamos el carrito
    const [qtyById, setQtyById] = useState({}); // { [productId]: number }
    const [msg, setMsg] = useState("");

    // helper: leer/poner cantidad del input
    const getQtyFor = (id) => Math.max(1, Number(qtyById[id] || 1));
    const setQtyFor = (id, v) => setQtyById(prev => ({ ...prev, [id]: Math.max(1, Number(v || 1)) }));


    useEffect(() => {
        if (!clasifications) return;

        if (clasifications) setCard(clasifications);

        const fetchData = async () => {
            setLoading(true);
            const resProducts = await fetch('/api/products/get');
            const productsData = await resProducts.json();

            const filtered = productsData.product.filter(card =>
                card.brand === brand &&
                card.clasification.includes(clasifications) &&
                card._id == product
            );

            const imageB1 = cards.brands.filter(brand2 => brand2.text == brand);
            setImagebrand(imageB1[0]?.image || imagebrand);

            setData(filtered);

            const uniqueClasifications = [...new Set(filtered.flatMap(card => card.clasification))];
            setClasification(uniqueClasifications);
            setLoading(false);
        };

        fetchData();
    }, [clasifications, brand, product]);

    if (!card) return <div>Cargando...</div>;

    return (
        <div>
            <Layout1>
                <Whatssapp />
                <p className='pt-2'>{card?.description}</p>

                {data && data[0] ? (
                    <div>
                        <div className='flex justify-center items-center gap-16'>
                            <img src={imagebrand} alt={card?.title || 'brand'} className="my-0 border-0 w-auto h-40 max-w-md" />
                            <h1 className="flex justify-center text-black text-3xl font-bold">{clasifications}</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 pt-8 gap-4">
                            {data?.map((class2, index) => {
                                const pid = String(class2._id || class2.id || product);
                                const unitPrice = Number(class2.price ?? card?.price ?? 0);
                                const stock = Number(class2.qty ?? card?.qty ?? 0) || 0;         // 👈 stock desde BD
                                const already = getQty(pid, clasifications);                      // 👈 ya en carrito
                                const available = Math.max(0, stock - already);
                                const desired = Math.min(getQtyFor(pid), available || 1);         // clamp al input

                                const outOfStock = stock <= 0 || available <= 0;

                                return (
                                    <div key={index} className="border rounded-xl p-4 shadow-md">
                                        <img src={class2.image?.[0]} alt={class2.title} className="w-auto object-cover rounded" />
                                        <h2 className="text-xl font-bold mt-2">{class2.title}</h2>

                                        <div className="mt-1 text-lg font-semibold">${unitPrice.toFixed(2)} USD</div>

                                        <div className="mt-2 text-sm">
                                            {outOfStock
                                                ? <span className="text-red-600 font-medium">Sin stock</span>
                                                : <span className="text-gray-700">
                                                    Stock: <b>{stock}</b> — En carrito: <b>{already}</b> — Disponible: <b>{available}</b>
                                                </span>}
                                        </div>

                                        {/* Cantidad a agregar */}
                                        <div className="mt-3 flex items-center gap-2">
                                            <input
                                                type="number"
                                                min={1}
                                                max={Math.max(1, available)}
                                                value={getQtyFor(pid)}
                                                onChange={e => setQtyFor(pid, e.target.value)}
                                                className="w-24 border rounded px-2 py-1"
                                                disabled={outOfStock}
                                            />
                                            <button
                                                disabled={outOfStock}
                                                onClick={() => {
                                                    const want = getQtyFor(pid);
                                                    const res = addItem({
                                                        id: pid,
                                                        name: class2.title,
                                                        price: unitPrice,
                                                        qty: want,
                                                        image: class2.image?.[0],
                                                        variant: clasifications, // opcional
                                                    }, { max: stock });

                                                    if (!res.ok) {
                                                        setMsg(`No se puede agregar más. Ya tienes ${res.newQty} y el stock máximo es ${stock}.`);
                                                        return;
                                                    }
                                                    if (res.added < want) {
                                                        setMsg(`Solo se agregaron ${res.added} por límite de stock (máx ${stock}).`);
                                                    } else {
                                                        setMsg(`Agregado ${res.added} al carrito.`);
                                                    }
                                                    // Opcional: reset input a 1
                                                    setQtyFor(pid, 1);
                                                    // Limpiar mensaje después de 2s
                                                    setTimeout(() => setMsg(""), 2000);
                                                }}
                                                className={`mt-1 inline-flex items-center justify-center px-4 py-2 rounded text-white ${outOfStock ? 'bg-gray-400' : 'bg-black hover:opacity-90'}`}
                                            >
                                                Agregar al carrito
                                            </button>
                                        </div>
                                        <ClearCart />
                                    </div>
                                );
                            })}

                            {/* mensaje simple */}
                            {/* {msg && <div className="mt-4 p-2 text-sm rounded bg-amber-50 text-amber-700">{msg}</div>} */}
                            {/* Panel lateral (detalle) */}
                            <div>
                                <h2 className="text-2xl font-semibold text-green-900">
                                    {data[0].cardDetail}
                                </h2>
                                <h2 className="text-2xl font-semibold text-green-900">
                                    Cantidad en stock: {card?.qty ?? data[0]?.qty ?? 0}
                                </h2>
                                <h2 className="text-2xl font-semibold text-green-900">
                                    Precio: ${(Number(card?.price ?? data[0]?.price ?? 0)).toFixed(2)} USD
                                </h2>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-screen pr-50 h-64 border-0 flex items-center justify-center">
                        <LoaderTruck />
                    </div>
                )}
            </Layout1>
        </div>
    );
}

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import Layout1 from '@/components/Layout1'
// import LoaderTruck from '@/components/LoaderQwen'
// import Whatssapp from '@/components/Whatssapp'
// import cards from '../../../../components/products/card.json';

// export default function CardDetail() {
//     const router = useRouter();
//     const { brand, clasifications, product } = router.query;
//     const [imagebrand, setImagebrand] = useState('https://res.cloudinary.com/dvy9qircy/image/upload/v1749639487/forex/forex_academy_professional_camionStd.jpg');
//     const [card, setCard] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState(null);
//     const [clasification, setClasification] = useState(null);

//     useEffect(() => {
//         if (!clasifications) return;
//         // fetch('/cards.json')
//         //   .then(res => res.json())
//         //   .then(data => {
//         //     const found = data.cards.find(c => c.id.toString() === id);
//         //     setCard(found);
//         //   });

//         if (clasifications) setCard(clasifications)

//         const fetchData = async () => {
//             setLoading(true);
//             // Aquí iría la llamada real a tu API o BD
//             // Ejemplo: const res = await fetch(`/api/data/${id}`);
//             // const result = await res.json();
//             const resProducts = await fetch('/api/products/get');
//             const productsData = await resProducts.json();

//             const filtered = productsData.product.filter(card => card.brand === brand &&
//                 card.clasification.includes(clasifications) &&
//                 card._id == product);

//             const imageB1 = cards.brands.filter(brand2 => brand2.text == brand)
//             setImagebrand(imageB1[0].image)
//             setData(filtered)
//             const uniqueClasifications = [
//                 ...new Set(
//                     filtered
//                         .flatMap(card => card.clasification)
//                 )
//             ];
//             setClasification(uniqueClasifications)
//             setLoading(false);

//             // Simulación:
//             /* setTimeout(() => {
//                  const filtered = cards.cards.filter(card => card.brand === brand &&
//                      card.clasification.includes(clasifications) &&
//                      card.id == product);
//                  //setData({ id, name: `Item ${id}` });
//                  const imageB1 = cards.brands.filter(brand2 => brand2.text == brand)
//                  setImagebrand(imageB1[0].image)
//                  setData(filtered)
//                  const uniqueClasifications = [
//                      ...new Set(
//                          filtered
//                              .flatMap(card => card.clasification)
//                      )
//                  ];
//                  setClasification(uniqueClasifications)
//                  setLoading(false);
//              }, 1900);*/
//         };

//         fetchData();
//     }, [clasifications]);

//     if (!card) return <div>Cargando...</div>;

//     return (
//         <div>
//             <Layout1>
//                 <Whatssapp />
//                 <p className='pt-2'>{card.description}</p>
//                 {data && data[0] ? <div>
//                     <div className='flex justify-center items-center gap-16'>
//                         <img src={imagebrand} alt={card.title} className="my-0 border-0 w-auto h-40 max-w-md" />
//                         <h1 className="flex justify-center text-black  text-3xl font-bold">{clasifications}</h1>
//                     </div>

//                     {/* <h1>Detalle del Item</h1>
// <p>ID: {data[0].id}</p>
// <p>Nombre: {data[0].title}</p> */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 pt-8 gap-4">
//                         {data?.map((class2, index) =>

//                             <div key={index} className="border rounded-xl p-4  shadow-md">

//                                 <img src={class2.image[0]} alt={class2.title} className="w-auto  object-cover rounded" />
//                                 <h2 className="text-xl font-bold mt-2">{class2.title}</h2>


//                                 {/* Ver más */}

//                             </div>
//                         )
//                         }
//                         <div>
//                             <h2 className="text-2xl font-semibold text-green-900 transition-colors duration-300">
//                                 {data[0].cardDetail}
//                             </h2>
//                             <h2 className="text-2xl font-semibold text-green-900 transition-colors duration-300">
//                                 Cantidad: {card.qty ? card.qty : 0}
//                             </h2>
//                             <h2 className="text-2xl font-semibold text-green-900 transition-colors duration-300">
//                                 Precio: {card.price ? card.price : 0} $USD
//                             </h2>
//                         </div>
//                     </div>
//                 </div>

//                     :
//                     /**  Si no existe ninguna Card Mapeo esta */
//                     <div className="w-screen pr-50 h-64 border-0 flex items-center justify-center">
//                         <LoaderTruck />
//                     </div>}

//             </Layout1>
//         </div>
//     );
// }
