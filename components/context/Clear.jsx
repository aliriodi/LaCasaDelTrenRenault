"use client";
import { useCart } from "./CartContext";

export default function VaciarCarritoBtn() {
  const { clear } = useCart();
  return (
    <button
      onClick={clear}
      className="px-3 py-2 rounded bg-red-600 text-white hover:opacity-90"
      type="button"
    >
      Vaciar carrito
    </button>
  );
}
