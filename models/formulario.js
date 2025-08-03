import { Schema, model, models } from 'mongoose'


const FormsSchema = new Schema(
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
      }
    
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Fomr1 = models.Form1 || model('Forms', FormsSchema)

export default Product