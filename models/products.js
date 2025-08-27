import { Schema, model, models } from 'mongoose'


const ProductsSchema = new Schema(
  {
       
    title: {
      type: String,
      },
      description:{
        type: String,
      },
    image:{
        type: [],
      },
     alt:{
        type: String,
      },
      cardDetail:{
        type: String,
      },
      brand:{
        type: String,
      },
      clasification:{
        type: []
      },
      model:{
        type: String,
      },
      price:{
        type: Number,
      },
      qty:{
        type: Number,
      },
    
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Product = models.Product || model('Products', ProductsSchema)

export default Product