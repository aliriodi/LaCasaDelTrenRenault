import dbConnect from '../../../config/mongo'
import Products from '../../../models/products'

export default async function addBrands(req, res) {

    try {
      // const { first_name, last_name, email } = req.body;
  
      console.log('CONNECTING TO MONGO DB');
  
      await dbConnect()
  
      console.log('CONNECTED TO MONGO DB');
  
      console.log('CREATING PRODUCT');
      //console.log(req.body)
      const Product = await Products.create(req.body)
  
      console.log('CREATED PRODUCT', Product);
  
      res.json({ Product })
  
    } catch (error) {
      console.log(error);
      res.json({ error })
    }
  }