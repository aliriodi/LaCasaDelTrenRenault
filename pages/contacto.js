import ContactForm from "@/components/ContactForm";
import Layout1 from "@/components/Layout1"

export default function Contacto() {
  return (
    <Layout1>
    <div className="min-h-screen bg-gray-50 py-20">
      {/* <h1 className="text-3xl font-bold text-center mb-6">Contáctanos</h1> */}
      <ContactForm />
    </div>
    </Layout1>
  );
}
