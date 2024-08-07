"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface TableClientesProps {
  customerCharges: CustomerCharge[];
}

import { Trash } from 'lucide-react';

import { CustomerCharge } from "@/lib/stripe";
import { useEffect, useState } from "react";
import { CreateClient } from "./CreateClient";
import { DeleteClient } from "./DeleteClient";
import { UpdateClient } from "./UpdateClient";
  
export function TableClients({customerCharges}:TableClientesProps) {
  const [optimisticClients, setOptimisticClients] = useState<CustomerCharge[]>([]);

  useEffect(() => {
    setOptimisticClients(customerCharges)
  },[customerCharges])


  const addOptimisticClient = (newClient: CustomerCharge) => {
    setOptimisticClients((prevClients) => [newClient,...prevClients]);
  };

  const deleteOptimisticClietn = (clientId:string) => {
    setOptimisticClients((prevClients) => 
    prevClients.filter(client => client.id !== clientId)
  );
  }

  const updateOptimisticClient = (updatedClient: CustomerCharge) => {
    console.log(updatedClient)
    setOptimisticClients((prevClients) =>
      prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };


  return (
    <Table>
      <TableCaption>Lista de Clientes</TableCaption>
      
      <TableHeader>
        <CreateClient 
          addOptimisticClient={addOptimisticClient} 
        />
        <TableRow>
          <TableHead className="w-[210px]">Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead className="w-[30px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {optimisticClients?.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>
            <div className="flex gap-2">  
              <UpdateClient 
                id={customer.id} 
                name={customer.name} 
                email={customer.email} 
                updateOptimisticClient={updateOptimisticClient}
              />
              <DeleteClient deleteOptimisticClient={deleteOptimisticClietn} clientId={customer.id} />
            </div>                
            </TableCell>
  
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
