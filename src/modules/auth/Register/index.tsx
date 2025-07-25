import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import AuthService from "../Services/index";
import { useRouter } from "next/navigation";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    values.userType = "CLIENT";
    try {
      await AuthService.register(values);
      toast.success("Usuário cadastrado com sucesso!");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao fazer login");
    }
  });

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Novo Usuário</h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 min-w-64 max-w-96">
          <Input
            placeholder="Name"
            {...register("name")}
            hint={errors.name?.message}
          />
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
          <Button className="w-full">Cadastrar</Button>
        </div>
      </form>
    </div>
  );
}
