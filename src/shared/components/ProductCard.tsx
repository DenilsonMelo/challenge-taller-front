import { formatPrice } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProductResponse } from "@/modules/products/types";
import Image from "next/image";

interface ProductCardProps {
  product: ProductResponse;
  onAddToCart?: (product: ProductResponse) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  return (
    <Card className="w-full max-w-sm mx-auto bg-[var(--white)] border-[var(--light-grey)] hover:shadow-lg transition-all duration-300 hover:border-[var(--color-primary-light)] group">
      <CardHeader className="p-4 pb-2">
        <div className="relative w-full h-48 bg-[var(--light-grey)] rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <CardTitle className="text-lg font-semibold text-[var(--black)] mb-2 line-clamp-2">
          {product.name}
        </CardTitle>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-[var(--primary-base)]">
            {formatPrice(product.price)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          variant="default"
        >
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
