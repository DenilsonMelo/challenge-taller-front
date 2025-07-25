"use client";

import Cart from "@/modules/cart";
import { CartResponse } from "@/modules/cart/types";
import { Loader } from "@/shared/components/ui/loader";
import { useInitialData } from "@/shared/hooks/useInitialData";
import CartService from "@/modules/cart/Services/index";

export default function Page() {
  const { data, isLoading } = useInitialData<CartResponse, CartResponse>({
    api: {
      get: CartService.getMyCart,
    },
  });

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader />
      </div>
    );
  }

  return <Cart data={data} />;
}
