import { TableClients } from "@/components/clients/TableClients"
import { getCustomerCharges } from "@/lib/stripe"

export default async function Clients() {
  const customerCharges = await getCustomerCharges()

  return (
    <div>
      <section className="ml-4 text-black w-8/12 sm:w-10/12">
        <TableClients customerCharges={customerCharges} />
      </section>
    </div>
  )
}
