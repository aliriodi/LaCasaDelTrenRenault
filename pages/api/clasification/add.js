import dbConnect from '../../../config/mongo'
import Clasification from '../../../models/clasification'

export default async function addBrands(req, res) {

    try {
      // const { first_name, last_name, email } = req.body;
  
      console.log('CONNECTING TO MONGO DB');
  
      await dbConnect()
  
      console.log('CONNECTED TO MONGO DB');
  
      console.log('CREATING CLASIFICATION');
      //console.log(req.body)
      const clas = await Clasification.create(req.body)
  
      console.log('CREATED CLASIFICATION', clas);
  
      res.json({ clas })
  
    } catch (error) {
      console.log(error);
      res.json({ error })
    }
  }