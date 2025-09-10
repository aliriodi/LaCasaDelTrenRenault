"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartButton({ onClick }) {
  const { count } = useCart();
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center p-0 rounded hover:bg-yellowThirth cursor-pointer"
      aria-label="Carrito"
    >
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
