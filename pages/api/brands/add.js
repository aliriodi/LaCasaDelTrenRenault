import dbConnect from '../../../config/mongo'
import Brands from '../../../models/brands'

export default async function addBrands(req, res) {

    try {
      // const { first_name, last_name, email } = req.body;
  
      console.log('CONNECTING TO MONGO DB');
  
      await dbConnect()
  
      console.log('CONNECTED TO MONGO DB');
  
      console.log('CREATING BRAND');
      //console.log(req.body)
      const brand = await Brands.create(req.body)
  
      console.log('CREATED BRAND', brand);
  
      res.json({ brand })
  
    } catch (error) {
      console.log(error);
      res.json({ error })
    }
  }