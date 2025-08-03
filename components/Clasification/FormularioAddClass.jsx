import { useState } from "react";
import Cloudinary from "@/components/Cloudinary/Cloudinary2";

export default function BrandForm() {
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageurl, setImageurl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/clasification/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text:  brandName,
                               image: imageurl }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la marca");
      }

      const data = await response.json();
      console.log(data)
      setMessage("Clasificacion guardada con éxito: " + data.clas.text);
      setBrandName(""); // limpiar campo
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
        <div className="pt-14">
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-xl shadow-md max-w-md mx-auto"
    >
      <input
        type="text"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        placeholder="Nombre de la clasificacion"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64"
        required
      />
      <Cloudinary imageurl={setImageurl} name={brandName} input={false}/>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
      {message && (
        <p className="text-sm mt-2 text-center text-gray-700 w-full">{message}</p>
      )}
    </form>
    </div>
    
  );
}
