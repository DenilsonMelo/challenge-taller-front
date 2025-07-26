import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { CartResponse, CartItemData } from "./types";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/shared/lib/utils";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CartItemService from "@/modules/cart/Services/cart-item";
import { useCart } from "@/shared/contexts/CartContext";
import { useRouter } from "next/navigation";
import OrderSummary from "@/shared/components/OrderSummary";

type CartDataProps = {
  data: CartResponse;
};

export default function Cart({ data }: CartDataProps) {
  const { cart, setCart, updateItemQuantity, removeItem } = useCart();
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCart(data);
  }, [data, setCart]);

  const cartData = cart || data;

  const onUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      updateItemQuantity(itemId, quantity);

      const { ...itemData } =
        cartData.cartItems.find((item) => item.id === itemId) || {};
      delete (itemData as any).product;
      await CartItemService.update(itemId, {
        ...itemData,
        quantity,
      });
    } catch (error: any) {
      setCart(data);
      toast.error(
        error?.response?.data?.message || "Erro ao atualizar quantidade"
      );
    }
  };

  const onRemoveItem = async (itemId: string) => {
    try {
      removeItem(itemId);
      await CartItemService.remove(itemId);
      toast.success("Item removido do carrinho!");
    } catch (error: any) {
      setCart(data);
      toast.error(error?.response?.data?.message || "Erro ao remover item");
    }
  };

  const onCheckout = async () => {
    if (!cartData.cartItems.length) {
      toast.error("Carrinho está vazio!");
      return;
    }
    setIsOrderSummaryOpen(true);
  };

  const handleOrderComplete = () => {
    setCart(null);
    router.push("/products");
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    onUpdateQuantity?.(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    onRemoveItem?.(itemId);
  };

  if (!data.cartItems || data.cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-[var(--white)] border-[var(--light-grey)]">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-16 w-16 text-[var(--random-4)] mb-4" />
            <h2 className="text-xl font-semibold text-[var(--black)] mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-[var(--random-4)] text-center">
              Adicione alguns produtos para começar suas compras
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[var(--black)] mb-6">
              Meu Carrinho ({cartData.cartItems.length}{" "}
              {cartData.cartItems.length === 1 ? "item" : "itens"})
            </h1>

            <div className="space-y-4">
              {cartData.cartItems.map((item: CartItemData) => (
                <Card
                  key={item.id}
                  className="bg-[var(--white)] border-[var(--light-grey)]"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-24 h-24 bg-[var(--light-grey)] rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--black)] mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-[var(--random-4)] mb-2">
                          Preço unitário: {formatPrice(item.product.price)}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border-2 border-[var(--light-grey)] rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="h-8 w-8 p-0 hover:bg-[var(--color-primary-lightest)]"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium text-[var(--black)]">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="h-8 w-8 p-0 hover:bg-[var(--color-primary-lightest)]"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-[var(--primary-base)] hover:bg-[var(--color-primary-lightest)] h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-[var(--primary-base)]">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:w-80">
            <Card className="bg-[var(--white)] border-[var(--light-grey)] sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-[var(--black)]">
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <hr className="border-[var(--light-grey)]" />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[var(--black)]">Total</span>
                  <span className="text-[var(--primary-base)]">
                    {formatPrice(cartData.total)}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={onCheckout} className="w-full" size="lg">
                  Finalizar Compra
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <OrderSummary
        cartData={cartData}
        isOpen={isOrderSummaryOpen}
        onOpenChange={setIsOrderSummaryOpen}
        onOrderComplete={handleOrderComplete}
      />
    </>
  );
}
