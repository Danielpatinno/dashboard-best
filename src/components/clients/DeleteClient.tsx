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
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Trash } from "lucide-react";
import { deleteCustomer } from "@/lib/stripe";

interface DeleteClientProps {
  clientId:string 
  deleteOptimisticClient: (clientId:string) => void
}

export function DeleteClient({ clientId, deleteOptimisticClient } :DeleteClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteClient = async () => {

    try {
      await fetch('/api/delete-customer', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId }),
      });

      toast({
        action: (
          <div className="flex w-full items-center gap-4">
          <span>Cliente excluido.</span>
          </div>
        ),
      });

      deleteOptimisticClient(clientId)

      setDialogOpen(false);        
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Trash className="cursor-pointer text-red-500 flex mt-4"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atenção</DialogTitle>
          <DialogDescription>
             Deseja excluir ?
          </DialogDescription>
        </DialogHeader>
          <div>
            <p>Os dados de cobrança do cliente serão removidos permanentemente</p>
            <div className="flex justify-end">
              <Button onClick={() => setDialogOpen(false)} size="sm" className="mt-4 px-3">
                Cancelar
              </Button> 
              <Button 
                onClick={handleDeleteClient}
                size="sm" 
                className="mt-4 px-3 bg-red-500"
              >
                Excluir
              </Button>                   
            </div>
          </div>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
