import React, { useEffect, useState } from 'react';
import Layout1 from '@/components/Layout1';
import { useRouter } from 'next/router';
import LoaderTruck from '@/components/LoaderQwen';
import Whatssapp from '@/components/Whatssapp'
//import cards from '../../../components/products/card.json';

export default function Clasification() {
  // COMPONENTE DE MARCA -> CLASIFICACION
  const router = useRouter();
  const { brand } = router.query;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [clasification, setClasification] = useState(null);
  const [imagebrand, setImagebrand] = useState('https://res.cloudinary.com/dvy9qircy/image/upload/v1749639487/forex/forex_academy_professional_camionStd.jpg');
  const [cardBD, setCardBD] = useState(null);
  // Simulamos la carga de datos
  useEffect(() => {
    if (!brand) return; // Si no hay marca, no hacer nada

    const fetchData = async () => {
      setLoading(true);
      // Aquí iría la llamada real a tu API o BD
      // Ejemplo: const res = await fetch(`/api/data/${id}`);
      // const result = await res.json();
      const res = await fetch('/api/brands/get').then(res=> res.json())
      const res2 = await fetch('/api/products/get').then(res=> res.json())
      const clas = await fetch('/api/clasification/get').then(res=> res.json())
      setCardBD(clas)
      const filtered = res2.product.filter(card => card.brand == brand);
      const imageB1 = res.brands.filter(brand2 => brand2.text == brand)

      setImagebrand(imageB1[0].image)
      //setData({ id, name: `Item ${id}` });
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
    /*  setTimeout(() => {
        const filtered = cards.cards.filter(card => card.brand === brand);
        const imageB1 = cards.brands.filter(brand2 => brand2.text == brand)
        setImagebrand(imageB1[0].image)
        //setData({ id, name: `Item ${id}` });
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
  }, [brand]);

//Contando Productos
function LookQtyPorudcts(product) {
  //console.log(data)
  const CountQtyProducts = data.filter(card => {
                                                     //  console.log(card.clasification,product)
                                                      return card.clasification?.includes(product);
                                                      } )
  //console.log(CountQtyProducts)
  return CountQtyProducts.length
}
  //BUSCANDO IMAGEN EN LA CLASIFICACION HAY QUE BUSCAR EN LA BD
  function Lookimage(class2) {
    
    const imageB1 = cardBD.clas.filter(clasification => clasification.text == class2)
    //console.log(imageB1.length)

    if (imageB1.length > 0 && imageB1[0].image.length > 5) { return imageB1[0].image }
    return 'https://res.cloudinary.com/dvy9qircy/image/upload/v1749677049/forex/forex_academy_professional_camionstdv2.png'

  }

  return (
    <Layout1 className=''>
      <div className="w-full px-0   "><Whatssapp/>
        {loading ? (
          /** Loading Loader  */
          
          // <div className="w-full pr-50 h-64 border-0 flex items-center justify-center">
          <div className="w-screen">
            <LoaderTruck />
          </div>
        ) :

          /* Segmento donde mapeo las cards si existe almenos 1 */
          data && data[0] ? <div className=''>
            <img src={imagebrand} alt={brand} className="w-auto h-40 object-cover rounded mx-auto" />
            {/* <h1>Detalle del Item</h1>
            <p>ID: {data[0].id}</p>
            <p>Nombre: {data[0].title}</p> */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 ">
              {clasification?.map((class2, index) =>

                <div key={index} className="hover:bg-yellowPrimary rounded-xl p-4 shadow-md mx-auto flex flex-col items-center text-center">
                  <a
                    href={router.asPath + '/' + class2}
                    className="hover:underline"
                  >
                    <img
                      src={Lookimage(class2)}
                      alt={class2}
                      className="w-auto h-40 object-cover rounded mx-auto"
                    />
                    <h2 className="text-xl font-bold mt-2">{class2}</h2>
                    <h2 className="text-xl font-bold mt-2">{LookQtyPorudcts(class2)} {LookQtyPorudcts(class2)>1? 'productos' : 'producto' }</h2>
                  </a>
                </div>
              )
              }
            </div>
          </div>

            :
            /**  Si no existe ninguna Card Mapeo esta */
            <div className="w-screen min-h-[20rem] border-0 flex flex-col items-center justify-center">
              <img
                src={imagebrand}
                alt={brand}
                className="w-auto h-40 object-cover rounded mb-14"
              />
              <div className="text-center text-xl font-bold">No existen productos</div>
            </div>
        }




      </div>
    </Layout1>
  );
}

