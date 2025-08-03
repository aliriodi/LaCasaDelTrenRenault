import { useState } from "react";
import Cloudinary from "@/components/Cloudinary/Cloudinary2";
//import Layout1 from "@/components/Layout1";

export default function ProductForm() {
  const [clasificationInput, setClasificationInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: [], // array
    alt: "",
    cardDetail: "",
    brand: "",
    clasification: [], // array
    model: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
        setFormData({
          ...formData,
          description: value,
          cardDetail: value,
        });}

       
    // Si es un campo array, lo separamos por coma
    else if (name === "image" || name === "clasification") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
        alt: formData.title,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (url) => {
    // Agrega una imagen al array
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, url],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

   // convertí la cadena a array antes de enviar
  const clasificationArray = clasificationInput
  .split(",")
  .map((item) => item.trim())
  .filter((item) => item.length > 0);

const preparedFormData = {
  ...formData,
  clasification: clasificationArray,
};

    try {
      const response = await fetch("/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedFormData),
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      const data = await response.json();
      setMessage("Producto guardado con éxito: " + data.Product.title);
      setFormData({
        title: "",
        description: "",
        image: [],
        alt: "",
        cardDetail: "",
        brand: "",
        clasification: [],
        model: "",
      });
      setClasificationInput("")
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Layout1>
      <div className="pt-14">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-10 border rounded-xl shadow-md max-w-4xl  mx-auto"

          //className="flex flex-col gap-4 p-24 border rounded-xl shadow-md max-w-xl mx-auto"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          {/* <input
            type="text"
            name="alt"
            value={formData.alt}
            onChange={handleChange}
            placeholder="Texto alternativo"
            className="input"
          /> */}

          {/* <input
            type="text"
            name="cardDetail"
            value={formData.cardDetail}
            onChange={handleChange}
            placeholder="Detalle de tarjeta"
            className="input"
          /> */}

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Marca"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <input
            type="text"
            name="clasification"
           // value={formData.clasification.join(", ")}
           value={clasificationInput}
            //onChange={handleChange}
            onChange={(e) => setClasificationInput(e.target.value)}
            placeholder="Clasificación (separada por coma)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Modelo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          {/* Mostrar imágenes cargadas */}
          {formData.image.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.image.map((img, idx) => (
                <img key={idx} src={img} alt={formData.alt} className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
          )}

          {/* Widget Cloudinary */}
          <Cloudinary imageurl={handleImageUpload} name={formData.title} input={false} />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

          {message && <p className="text-sm mt-2 text-center text-gray-700">{message}</p>}
        </form>
      </div>
    // </Layout1>
  );
}
