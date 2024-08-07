import { TableSales } from "@/components/sales/TableSales"
import { getPayments } from "@/lib/stripe"
import { Suspense } from "react"

export default async function Sales() {
  const payments = await getPayments()

  return (
    <div className="text-black w-4/6">
    <Suspense fallback={<span>Carregando...</span>}>

    <TableSales sales={payments}/>
    </Suspense>

    </div>
  )
}