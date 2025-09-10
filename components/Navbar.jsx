import { useState } from "react";
import { Menu, X } from "lucide-react"; // o usa íconos SVG normales si no tenés lucide-react
import Link from "next/link";
import CartButton from "@/components/context/CartButton";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white text-green-950 fixed top-0 w-full z-50 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* <div className="text-2xl font-bold">Mi Sitio</div> */}
        <div></div>
        <img src="https://res.cloudinary.com/dnrkfwzwp/image/upload/v1754261997/La_casa_del_tren_RenaultlogoHeber.jpg" alt="Logo" className="h-20 w-auto" />

        {/* Botón hamburguesa */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="text-yellowPrimary  w-6 h-6 stroke-[3] transition-transform duration-200 ease-in-out hover:scale-120" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enlaces para pantallas grandes */}
        <ul className="hidden md:flex  justify-center space-x-6 pr-20">
          <li><Link href="/#Inicio"    className="text-yellowPrimary hover:text-yellowThirth font-extrabold">Inicio</Link></li>
          <li><Link href="/products/Renault" className="text-yellowPrimary hover:text-yellowThirth font-extrabold">Productos</Link></li>
          <li><Link href="/#Servicios" className="text-yellowPrimary hover:text-yellowThirth font-extrabold">Servicios</Link></li>
          <li><Link href="/contacto"  className="text-yellowPrimary hover:text-yellowThirth font-extrabold">Contacto</Link></li>
          <li><CartButton onClick={() => alert('Hola') /* abrir modal de carrito o ir a /checkout */ } /></li>
        </ul>
      </div>

      {/* Menú desplegable en mobile */}
      {open && (
        <div className="absolute top-16 right-2 z-50 bg-black border border-slate-400 shadow-xl rounded-md p-4 w-fit animate-slide-down">
        <ul className="md:hidden space-y-2">
          <li>
            <Link href="/#Inicio" onClick={() => setOpen(!open)} className="block text-yellowPrimary transition-transform duration-200 hover:scale-115">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/products/Renault" onClick={() => setOpen(!open)} className="block text-yellowPrimary transition-transform duration-200 hover:scale-115">
              Productos
            </Link>
          </li>
          <li>
            <Link href="/#Servicios" onClick={() => setOpen(!open)} className="block text-yellowPrimary transition-transform duration-200 hover:scale-115">
              Servicios
            </Link>
          </li>
          <li>
            <Link href="/#Contacto" onClick={() => setOpen(!open)} className="block text-yellowPrimary transition-transform duration-200 hover:scale-115">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
      )}
    </div>
  );
};

export default Navbar;
