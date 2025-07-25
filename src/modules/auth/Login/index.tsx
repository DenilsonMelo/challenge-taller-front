import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { loginSchema } from "./types";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register } = useForm<loginSchema>();

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="flex flex-col gap-2 min-w-64 max-w-96">
        <Input placeholder="Email" {...register("mail")}/>
        <Input placeholder="Password" type="password" {...register("password")}/>
        <Button className="w-full">Entrar</Button>
      </div>
    </div>
  );
}
