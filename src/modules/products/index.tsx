import ProductCard from "@/shared/components/ProductCard";
import { ProductResponse } from "./types";

type ProductProps = {
  data: ProductResponse[];
};

export default function Products({ data }: ProductProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(product) => {
              console.log("Adicionando ao carrinho:", product);
            }}
          />
        ))}
      </div>
    </div>
  );
}
