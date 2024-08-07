import { TableSales } from '@/components/home/TableSales';
import { getPayments, getProductsAndPrices, getSoldProducts } from '@/lib/stripe';
import { formatPrice } from '@/lib/utils';

export default async function Home() {
  const [ productsAndPrices, payments, solds] = await Promise.all([
    getProductsAndPrices(),
    getPayments(),
    getSoldProducts()
  ])

  let requests = 0
  const getRequests = () => {
    solds.forEach((sold ) => {
      requests += sold.quantity
    })
  }
  getRequests()

  let salesValue = 0
  const getSales = () => {
    productsAndPrices.forEach((produto) => {
      solds.forEach((pagamento) => {
        if (pagamento.id === produto.id) {
          salesValue += produto.price * pagamento.quantity;
        }
      });
    });    
  }
  getSales()

  return (
    <main className="flex ml-6 gap-8 text-black"> 
      <div>
        <h2 className='mt-4'>Confira os resultados</h2>
        <div className='flex gap-6'>
          <div className='w-64 border-2 p-6 m-4'>
            <h3>Pedidos</h3>
            <h4>Total em pedidos</h4>
            <p className='font-bold'>{requests}</p>
          </div>
          <div className='w-64 border-2 p-6 m-4'>
            <h3>Vendas</h3>
            <h4>Total em vendas hoje</h4>
            <p className='font-bold'>{formatPrice(0)}</p>
          </div>
          <div className='w-64 border-2 p-6 m-4'>
            <h3>Vendas</h3>
            <h4>Total em vendas</h4>
            <p className='font-bold'>{formatPrice(salesValue / 100)}</p>
          </div>
        </div>

        <section className='border-2'>
          <TableSales  invoices={payments}/>
        </section>
      </div>

        <div className='w-1/6 mt-14 p-6 border-2'>
          <h2 className='text-black'>Produtos mais vendidos</h2>
          <ul>
            {solds.sort((a, b) => b.quantity - a.quantity).map((sold) => (
              <li key={sold.id} className='flex justify-between p-4 border-b'>
                {sold.name}
                <span>{sold.quantity}</span>
              </li>
            ))}
          </ul>
          
        </div>
    </main>
  );
}
