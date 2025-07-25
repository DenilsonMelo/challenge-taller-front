"use client";

import { Button } from "./ui/button";
import useAuthStore from "@/modules/auth/authStore";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { logout, user } = useAuthStore();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-[var(--white)] border-b-2 border-[var(--light-grey)] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/products">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="TallerStore" width={40} height={40} />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-[var(--black)] sm:text-2xl">
                  TallerStore
                </h1>
                <span className="text-xs text-[var(--random-4)] hidden sm:block">
                  Sua loja favorita
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => router.push("/cart")}
              variant="ghost"
              size="sm"
              className="relative p-2 hover:bg-[var(--color-primary-lightest)]"
            >
              <ShoppingCart className="h-6 w-6 text-[var(--primary-base)]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--primary-base)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Button>

            {user ? (
              <>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-[var(--black)]">
                    Olá, {user.name || "Usuário"}
                  </span>
                  <span className="text-xs text-[var(--random-4)]">
                    {user.mail}
                  </span>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 border-[var(--primary-base)] text-[var(--primary-base)] hover:bg-[var(--color-primary-lightest)]"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => router.push("/auth/login")}
                variant="default"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
