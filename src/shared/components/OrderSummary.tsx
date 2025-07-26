import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { CartResponse, CartItemData } from "@/modules/cart/types";
import { formatPrice } from "@/shared/lib/utils";
import { ShoppingCart, Package, Check } from "lucide-react";
import Image from "next/image";
import OrderService from "@/modules/order/Services/index";
import { toast } from "react-toastify";

interface OrderSummaryProps {
  cartData: CartResponse;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderComplete?: () => void;
}

export default function OrderSummary({
  cartData,
  isOpen,
  onOpenChange,
  onOrderComplete,
}: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmOrder = async () => {
    try {
      setIsProcessing(true);
      
      if (!cartData.cartItems.length) {
        toast.error("Carrinho está vazio!");
        return;
      }

      await OrderService.create({ cartId: cartData.id });
      
      toast.success("Pedido realizado com sucesso!");
      onOpenChange(false);
      onOrderComplete?.();
      
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Erro ao processar pedido"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const totalItems = cartData.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-[var(--primary-base)]" />
            Resumo do Pedido
          </DialogTitle>
          <DialogDescription>
            Revise os itens do seu pedido antes de finalizar a compra
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-[var(--color-primary-lightest)] p-4 rounded-lg">
            <h3 className="font-semibold text-[var(--black)] mb-2">
              Dados do Cliente
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-[var(--black)]">
                <strong>Nome:</strong> {cartData.user.name}
              </p>
              <p className="text-sm text-[var(--black)]">
                <strong>Email:</strong> {cartData.user.mail}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--black)] mb-4 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Itens do Pedido ({totalItems} {totalItems === 1 ? "item" : "itens"})
            </h3>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartData.cartItems.map((item: CartItemData) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-[var(--white)] border border-[var(--light-grey)] rounded-lg"
                >
                  <div className="relative w-12 h-12 bg-[var(--light-grey)] rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--black)] text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[var(--random-4)]">
                      {formatPrice(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-[var(--primary-base)]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--light-grey)] pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--random-4)]">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})
                </span>
                <span className="text-[var(--black)]">
                  {formatPrice(cartData.total)}
                </span>
              </div>
              
              <hr className="border-[var(--light-grey)]" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-[var(--black)]">Total</span>
                <span className="text-[var(--primary-base)]">
                  {formatPrice(cartData.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="border-[var(--light-grey)] text-[var(--random-4)] hover:bg-[var(--light-grey)]"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmOrder}
            disabled={isProcessing || !cartData.cartItems.length}
            className="flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Processando...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Confirmar Pedido
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}