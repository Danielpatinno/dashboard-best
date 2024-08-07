"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { toast } from "../ui/use-toast";
import { Check } from "lucide-react";
import { CustomerCharge } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

interface CreateClientProps {
  addOptimisticClient: (newClient:CustomerCharge) => void
}

export function CreateClient({ addOptimisticClient }:CreateClientProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    const newClient: CustomerCharge = {
      id: Math.random().toString(),
      name,
      email
    };
  
    try {
      await fetch('/api/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
  
      toast({
        action: (
          <div className="flex w-full items-center gap-4">
            <Check className="text-emerald-600" />
            <span>Cliente cadastrado com sucesso.</span>
          </div>
        ),
      });

      addOptimisticClient(newClient);

      setDialogOpen(false);
      setName("")
      setEmail("")
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }

  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Novo Cliente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar cliente</DialogTitle>
          <DialogDescription>
            Adicione um novo cliente
          </DialogDescription>
        </DialogHeader>
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome aqui"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email" className="">
              E-mail
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail aqui"
            />
          </div>
          <Button type="submit" size="sm" className="mt-4 px-3">
            Cadastrar
          </Button>
        </form>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
