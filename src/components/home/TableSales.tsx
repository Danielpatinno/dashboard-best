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
import Stripe from "stripe"
  

interface table {
  paymentStatus: string
  totalAmount: string
  paymentMethod: string
}


interface TableProps {
  invoices: Stripe.PaymentIntent[]
}
  
export function TableSales({invoices}:TableProps) {
  
  const verificarStatus = (status: string) => {
    if(status === "succeeded") {
      return 'Sucesso'
    } else if(status === "requires_payment_method") {
      return 'Erro na operação'
    }
  }

  const verificarCartao = (card:string) => {
    if(card === "card") {
      return 'Cartão de crédito'
    } 
  }

    return (
      <Table>
        <TableCaption>Ultimas Vendas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Pedido</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Método</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 6).map((invoice, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">PED00{i}</TableCell>
              <TableCell>{verificarStatus(invoice.status)}</TableCell>
              <TableCell>{verificarCartao(invoice.payment_method_types[0])}</TableCell>
              <TableCell className="text-right">{formatPrice(invoice.amount / 100)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  