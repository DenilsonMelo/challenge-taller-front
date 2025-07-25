import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema } from "./types";

export default function Register() {
  const { register } = useForm<registerSchema>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Novo Usuário</h1>
      <div className="flex flex-col gap-2 min-w-64 max-w-96">
        <Input placeholder="Name" {...register("name")}/>
        <Input placeholder="Email" {...register("mail")}/>
        <Input placeholder="Password" type="password" {...register("password")}/>
        <Button className="w-full">Cadastrar</Button>
      </div>
    </div>
  );
}
