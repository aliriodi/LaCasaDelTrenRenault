import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout1 from '@/components/Layout1';
import LoaderTruck from '@/components/LoaderQwen';
import Whatssapp from '@/components/Whatssapp';

export default function Products() {
  const router = useRouter();
  const { brand, clasifications } = router.query;

  const [imagebrand, setImagebrand] = useState('https://res.cloudinary.com/dvy9qircy/image/upload/v1749639487/forex/forex_academy_professional_camionStd.jpg');
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  console.log('Estoy en clasification')
  useEffect(() => {
    if (!clasifications || !brand) return;

    setCard(clasifications); // Guardamos el nombre de la clasificación

    const fetchData = async () => {
      setLoading(true);
      try {
        const resBrands = await fetch('/api/brands/get');
        const brandsData = await resBrands.json();

        const resProducts = await fetch('/api/products/get');
        const productsData = await resProducts.json();

        const filteredProducts = productsData.product.filter(
          (p) => p.brand === brand && p.clasification.includes(clasifications)
        );

        const brandObj = brandsData.brands.find(b => b.text === brand);
        if (brandObj && brandObj.image) {
          setImagebrand(brandObj.image);
        }

        setData(filteredProducts);
      } catch (error) {
        console.error("Error al cargar productos o marcas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clasifications, brand]);

  if (loading) {
    return (
      <Layout1>
        <div className="w-screen h-64 border-0 flex items-center justify-center">
          <LoaderTruck />
        </div>
      </Layout1>
    );
  }

  return (
    <Layout1>
      <Whatssapp />
      {data && data.length > 0 ? (
        <div className="w-screen max-w-7xl mx-auto px-0 py-8 ">
          <div className="flex flex-col items-center mb-8">
            <img
              src={imagebrand}
              alt={brand}
              className="w-auto h-40 object-cover rounded-lg shadow-lg"
            />
            <h1 className="mt-4 text-green-950 text-4xl font-extrabold tracking-tight">
              {clasifications}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {data.map((card, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-yellowPrimary"
              >
                <a href={`${router.asPath}/${card._id}`} className="block">
                  <img
                    src={card.image[0]}
                    alt={card.title}
                    className="w-full object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-semibold text-green-900 transition-colors duration-300">
                    {card.title}
                  </h2>
                  <h2 className="text-2xl font-semibold text-green-900 transition-colors duration-300">
                    Cantidad: {card.qty?card.qty:0}
                  </h2>
                  <h2 className="text-2xl font-semibold text-green-900 transition-colors duration-300">
                    Precio: {card.price?card.price:0} $USD
                  </h2>
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-screen h-64 flex items-center justify-center text-xl font-bold text-gray-600">
          No hay productos para esta clasificación
        </div>
      )}
    </Layout1>
  );
}
