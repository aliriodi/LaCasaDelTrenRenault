import dbConnect from '../../../config/mongo'
import Brands from '../../../models/brands'

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



    console.log('LOOKING BRANDS');

    const brands = await Brands.find().exec();

    console.log('BRANDS READY TO GO!!!');
    
    // Verifica procedencia de solicitud 
    console.log("/////////////////////////////// ",req.headers.accept == "*/*" ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

    if(req.headers.accept == "*/*"){
      // Solicitud desde el codigo
      return res.status(200).json({ brands } );
    }
    else{
      // Solicitud desde el navegador
      //res.status(200).json({ message : "Acceso Denegado" });
      res.status(200).json({ brands });
    }

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
