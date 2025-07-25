import Header from "@/shared/components/Header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">{children}</main>

    <footer className="bg-white shadow mt-auto w-full fixed bottom-0 left-0">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Taller Store. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}
