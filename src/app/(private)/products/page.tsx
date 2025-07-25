"use client";

import Products from "@/modules/products";
import { ProductResponse } from "@/modules/products/types";
import { Loader } from "@/shared/components/ui/loader";
import { useInitialData } from "@/shared/hooks/useInitialData";
import ProductService from "@/modules/products/Services/index";

export default function Page() {
  const { data, isLoading } = useInitialData<ProductResponse[], ProductResponse[]>({
    api: {
      get: ProductService.get,
    },
  });

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader />
      </div>
    );
  }

  return <Products data={data}/>;
}
