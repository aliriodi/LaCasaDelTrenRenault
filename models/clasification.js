import { Schema, model, models } from 'mongoose'


const ClasificationSchema = new Schema(
  {
       
    text: {
      type: String,
      },
    image:{
        type: String,
      }
    
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Clasification = models.Clasification || model('Clasifications', ClasificationSchema)

export default Clasification