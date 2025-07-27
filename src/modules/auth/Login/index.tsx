import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { LoginSchema } from "./types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { login, setUser } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await login(values);
      if (response) {
        setUser(response);
      }
      router.push("/products");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao fazer login");
    }
  });

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 min-w-64 max-w-96">
          <Input
            placeholder="Email"
            {...register("mail")}
            hint={errors.mail?.message}
          />
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
            hint={errors.password?.message}
          />
          <Button className="w-full">Entrar</Button>
          <span className="text-center mt-2">
            Não tem uma conta?{" "}
            <Link href="/auth/register" className="text-[var(--primary-base)] hover:underline">
              Cadastre-se
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
