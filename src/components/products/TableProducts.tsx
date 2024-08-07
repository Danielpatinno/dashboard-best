"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react";
  
interface Product {
  id: string
  image: string
  name: string
  price: number
}

interface Solds {
  id: string
  name:string
  quantity: number
}

interface TableProps {
  products: Product[]
  solds: Solds[]
}
  
export function TableProducts({products, solds}:TableProps) {

  return (
    <Table>
      <TableCaption>Lista de Produtos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Produto</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right">Vendidos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
            <div className="relative h-12 w-12">
              <Image 
                alt={product.name} 
                src={product.image}
                fill
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatPrice(product.price / 100)}</TableCell>
            <TableCell 
              className="text-right">         
              {(() => {
                const sold = solds.find((sold) => sold.id === product.id);
                if (sold) {
                  return <p>{sold.quantity}</p>;
                } else {
                  return <p>0</p>;
                }
                })()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
  