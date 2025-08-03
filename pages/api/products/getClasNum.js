import dbConnect from '../../../config/mongo'
import Products from '../../../models/products'
import Brands from '../../../models/brands';
import Clasification from '../../../models/clasification';
// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */


export default async function getAllBrands(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

const brand='Renault'

    console.log('LOOKING PRODUCTS');

     // 1. Obtener productos filtrados por marca
     const products = await Products.find({ brand }).lean();

     // 2. Obtener imagen de la marca
     const brandDoc = await Brands.findOne({ text: brand }).lean();
     const brandImage = brandDoc?.image || null;
 
     // 3. Obtener clasificaciones únicas
     const clasificationSet = new Set();
     products.forEach(p => {
       (p.clasification || []).forEach(c => clasificationSet.add(c));
     });
     const clasifications = [...clasificationSet];
 // 4. Contar productos por clasificación
 const qtyByClasification = {};
 clasifications.forEach(clas => {
   qtyByClasification[clas] = products.filter(p =>
     p.clasification?.includes(clas)
   ).length;
 });
  // 5. Obtener datos (imágenes) de cada clasificación
  const clasificationData = await Clasification.find({
    text: { $in: clasifications }
  }).lean();

    console.log('PRODUCTS READY TO GO!!!');
    
    // Verifica procedencia de solicitud 
    console.log("/////////////////////////////// ",req.headers.accept == "*/*" ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

    if(req.headers.accept == "*/*"){
      // Solicitud desde el codigo
      //return res.status(200).json({ product } );
      return res.status(200).json({
        brandImage,
        products,
        clasifications,
        qtyByClasification,
        clasificationData
      });
  
    }
    else{
      // Solicitud desde el navegador
      //res.status(200).json({ message : "Acceso Denegado" });
      //res.status(200).json({ product });
      return res.status(200).json({
        brandImage,
        products,
        clasifications,
        qtyByClasification,
        clasificationData
      });
  
    }

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
