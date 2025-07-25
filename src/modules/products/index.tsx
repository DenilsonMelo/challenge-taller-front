import { ProductResponse } from "./types";

type ProductProps = {
  data: ProductResponse[];
};

export default function Products({ data }: ProductProps) {
  console.log("Products data:",  data );

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
