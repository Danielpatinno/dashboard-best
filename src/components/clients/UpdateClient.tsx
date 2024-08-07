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
import { Check, Pencil } from "lucide-react";
import { CustomerCharge } from "@/lib/stripe";

interface DeleteClientProps {
  name: string | undefined | null
  email: string | null
  id: string
  updateOptimisticClient: (updatedClient: CustomerCharge) => void;
}

export function UpdateClient({ name,email, id, updateOptimisticClient}:DeleteClientProps) {
  const [newName, setNewName] = useState<string | undefined | null>(name || '');
  const [newEmail, setNewEmail] = useState<string | null>(email || '');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/update-customer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName, newEmail, id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedClient = await response.json();
      

      toast({
        action: (
          <div className="flex w-full items-center gap-4">
            <Check className="text-emerald-600" />
            <span>Cliente atualizado com sucesso.</span>
          </div>
        ),
      });

      updateOptimisticClient(updatedClient);
      setDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };
  
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Pencil className="cursor-pointer mt-4"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar cliente</DialogTitle>
          <DialogDescription>
            Dados da conta
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
              value={newName!}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome aqui"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email" className="">
              E-mail
            </Label>
            <Input
              id="email"
              value={newEmail!}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="E-mail aqui"
            />
          </div>
          <Button type="submit" size="sm" className="mt-4 px-3">
            Atualizar cliente
          </Button>
        </form>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
