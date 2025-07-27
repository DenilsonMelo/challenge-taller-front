import ProductCard from "@/shared/components/ProductCard";
import { ProductResponse } from "./types";
import { useCallback, useState } from "react";
import CartService from "@/modules/cart/Services";
import CartItemService from "@/modules/cart/Services/cart-item";
import useAuthStore from "@/modules/auth/authStore";
import { CartResponse } from "@/modules/cart/types";
import { toast } from "react-toastify";
import { Button } from "@/shared/components/ui/button";
import { Package, Plus } from "lucide-react";
import ProductModal from "@/shared/components/ProductModal";
import ProductService from "./Services/index";

type ProductProps = {
  data: ProductResponse[];
};

export default function Products({ data: initialData }: ProductProps) {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductResponse[]>(initialData);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>(null);

  const addProduct = useCallback((newProduct: ProductResponse) => {
    setProducts((state) => [newProduct, ...state]);
  }, []);

  const updateProduct = useCallback((updatedProduct: ProductResponse) => {
    setProducts((state) =>
      state.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      )
    );
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts((state) => state.filter((item) => item.id !== productId));
  }, []);

  const handleEditProduct = (product: ProductResponse) => {
    setSelectedProduct(product);
    setShowModalProduct(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await ProductService.delete(productId);
      removeProduct(productId);
      toast.success("Produto excluído com sucesso!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao excluir produto");
    }
  };

  const handleModalClose = () => {
    setShowModalProduct(false);
    setSelectedProduct(null);
  };

  const handleProductSuccess = (product: ProductResponse) => {
    if (selectedProduct) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    handleModalClose();
  };

  const addToCart = async (product: ProductResponse) => {
    if (!user) {
      toast.error(
        "Você precisa estar logado para adicionar produtos ao carrinho"
      );
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
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;

        if (newQuantity > product.stock) {
          toast.error("Quantidade solicitada excede o estoque disponível");
          return;
        }

        await CartItemService.update(existingItem.id, {
          quantity: newQuantity,
          total: product.price * newQuantity,
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
          total: product.price,
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
    <>
      <div className="container mx-auto px-4 pb-8">
        {user?.userType === "ADMIN" && (
          <div className="flex justify-end mb-4">
            <Button onClick={() => setShowModalProduct(true)}>
              <Plus className="mr-2" />
              Adicionar produto
            </Button>
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center text-gray-500">
            <div>
              <p className="flex items-center justify-center">
                <Package className="h-5 w-5 mr-2 text-gray-500" />
                Nenhum produto encontrado.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              disabled={isLoading}
            />
          ))}
        </div>
      </div>

      <ProductModal
        isOpen={showModalProduct}
        onClose={handleModalClose}
        product={selectedProduct}
        onSuccess={handleProductSuccess}
      />
    </>
  );
}
