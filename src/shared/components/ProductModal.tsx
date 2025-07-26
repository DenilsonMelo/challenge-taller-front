import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import ProductService from "@/modules/products/Services";
import {
  ProductData,
  ProductResponse,
  ProductSchema,
} from "@/modules/products/types";
import { toast } from "react-toastify";
import { Label } from "./ui/label";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductResponse | null;
  onSuccess?: (newProduct: ProductResponse) => void;
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  onSuccess,
}: ProductModalProps) {
  const isEditMode = !!product;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      imageFile: undefined,
      stock: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          name: product.name,
          price: product.price,
          stock: product.stock,
          imageFile: undefined,
        });
      } else {
        reset({
          name: "",
          price: 0,
          imageFile: undefined,
          stock: 0,
        });
      }
    }
  }, [isOpen, product, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValue("imageFile", file || undefined);
  };

  const onSubmit = async (data: ProductData) => {
    const formData = new FormData();

    if (data.imageFile && data.imageFile instanceof File) {
      formData.append("imageFile", data.imageFile, data.imageFile.name);
    }

    const productData = {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
    };

    formData.append("data", JSON.stringify(productData));

    try {
      if (isEditMode && product) {
        const response = await ProductService.update(product.id, formData);
        onSuccess?.(response.data);
        toast.success("Produto atualizado com sucesso!");
      } else {
        const response = await ProductService.create(formData);
        onSuccess?.(response.data);
        toast.success("Produto criado com sucesso!");
      }

      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          `Erro ao ${isEditMode ? "atualizar" : "criar"} produto`
      );
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[var(--black)]">
            {isEditMode ? "Editar Produto" : "Criar Novo Produto"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edite as informações do produto abaixo."
              : "Preencha as informações para criar um novo produto."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Digite o nome do produto"
              hint={errors.name?.message}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
                setValueAs: (value) => parseFloat(value) || 0,
              })}
              hint={errors.price?.message}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile">Imagem</Label>
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Estoque</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              {...register("stock", {
                valueAsNumber: true,
                setValueAs: (value) => parseInt(value) || 0,
              })}
              placeholder="0"
              hint={errors.stock?.message}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="default"
              className="flex-1"
            >
              {isSubmitting
                ? "Salvando..."
                : isEditMode
                ? "Atualizar"
                : "Criar Produto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
