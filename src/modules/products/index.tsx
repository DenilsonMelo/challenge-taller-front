import ProductCard from "@/shared/components/ProductCard";
import { ProductResponse } from "./types";
import { useState } from "react";
import CartService from "@/modules/cart/Services";
import CartItemService from "@/modules/cart/Services/cart-item";
import useAuthStore from "@/modules/auth/authStore";
import { CartResponse } from "@/modules/cart/types";
import { toast } from "react-toastify";

type ProductProps = {
  data: ProductResponse[];
};

export default function Products({ data }: ProductProps) {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (product: ProductResponse) => {
    if (!user) {
      toast.error("Você precisa estar logado para adicionar produtos ao carrinho");
      return;
    }

    if (product.stock === 0) {
      toast.error("Produto fora de estoque");
      return;
    }

    setIsLoading(true);

    try {
      let cart: CartResponse | null = null;
      
      try {
        const cartResponse = await CartService.getMyCart();
        cart = cartResponse.data;
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Erro ao buscar carrinho"
        );
      }

      if (!cart) {
        const newCartResponse = await CartService.create({ clientId: user.id });
        cart = newCartResponse.data;
      }

      const existingItem = cart?.cartItems?.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        
        if (newQuantity > product.stock) {
          toast.error("Quantidade solicitada excede o estoque disponível");
          return;
        }

        await CartItemService.update(existingItem.id, {
          quantity: newQuantity,
          total: product.price * newQuantity
        });

        toast.success("Quantidade do produto atualizada no carrinho!");
      } else {
        if (!cart) {
          toast.error("Carrinho não encontrado. Tente novamente.");
          setIsLoading(false);
          return;
        }

        await CartItemService.create({
          productId: product.id,
          cartId: cart.id,
          quantity: 1,
          total: product.price
        });

        toast.success("Produto adicionado ao carrinho!");
      }

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 
        "Erro ao adicionar produto ao carrinho"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            disabled={isLoading}
          />
        ))}
      </div>
    </div>
  );
}