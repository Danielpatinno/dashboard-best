import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPrice } from "@/lib/utils"
import Stripe from "stripe"

interface TableClientsProps {
  sales: Stripe.PaymentIntent[]
}
  
export function TableSales({sales}:TableClientsProps) {

  const checkStatus = (status: string) => {
    if(status === "succeeded") {
      return 'Sucesso'
    } else if(status === "requires_payment_method") {
      return 'Erro na operação'
    }
  }

  const checkTypeCard = (card:string) => {
    if(card === "card") {
      return 'Cartão de crédito'
    } 
  }

  return (
    <Table>
      <TableCaption>Vendas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Comprador</TableHead>
          <TableHead>Produto</TableHead>
          <TableHead>Método</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {sales.map((sale) => (
        <TableRow key={sale.id}>
          <TableCell>{sale.shipping?.name}</TableCell>
          <TableCell>
            {JSON.parse(sale.metadata.lineItems).map((item: any, index: number) => (
              <div key={index} className="font-medium">
                - {item.name}
              </div>
            ))}
          </TableCell>
          <TableCell>{checkTypeCard(sale.payment_method_types.join(', '))}</TableCell>
          <TableCell>{checkStatus(sale.status)}</TableCell>
          <TableCell>{formatPrice(sale.amount / 100)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    </Table>
  )
}
  