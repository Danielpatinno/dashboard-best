import { TableProducts } from "@/components/products/TableProducts"
import { getProductsAndPrices, getSoldProducts } from "@/lib/stripe"

export default async function Products() {
  const productsAndPrices = await getProductsAndPrices()
  const solds = await getSoldProducts()

  return (
    <div>
      <div className="ml-4 w-2/3">
        <TableProducts  
          solds={solds} 
          products={productsAndPrices}
        />
      </div>
    </div>
  )
}
