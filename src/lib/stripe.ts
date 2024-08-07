import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});


export type CustomerCharge = {
  // customer: {
    id: string;
    name: string | null | undefined;
    email: string | null;
    // phone: string | null | undefined;
  // };
  // charges: Stripe.Charge[];
};

// export type CustomerCharge = {
//   customer: Stripe.Customer;
//   charges: Stripe.Charge[];
// };

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface LineItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface SoldProduct {
  id: string;
  name: string;
  quantity: number;
}

export const getCustomerCharges = async (): Promise<CustomerCharge[]> => {

  const customers = await stripe.customers.list({ limit: 100 });

  const customerChargesPromises = customers.data.map(async (customer) => {
    const charges = await stripe.charges.list({ customer: customer.id, limit: 1 });
    // return { customer, charges: charges.data };
    return {
      //  customer: {
        id:customer.id,
        name: customer.name, 
        email:customer.email,
        // phone: customer.phone
      // }
        // charges:charges.data
    }
     
  });

  const results = await Promise.all(customerChargesPromises);

  return results;
};

export const getProductsAndPrices = async (): Promise<Product[]> => {
  const response = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: price ? price.unit_amount || 0 : 0,
    };
  });

  return products;
};

export const getPayments = async (): Promise<Stripe.PaymentIntent[]> => {
  try {
    const payments = await stripe.paymentIntents.list({
      limit: 10,
      expand: ['data.charges.data.balance_transaction'],
    });

    return payments.data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export async function getSoldProducts(): Promise<SoldProduct[]> {
  const productsSold: Map<string, SoldProduct> = new Map();
  
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100, 
    });

    paymentIntents.data.forEach((paymentIntent) => {
      if (paymentIntent.status === 'succeeded' && paymentIntent.metadata.lineItems) {
        const lineItems: LineItem[] = JSON.parse(paymentIntent.metadata.lineItems);

        lineItems.forEach((item) => {
          const existingItem = productsSold.get(item.id);
          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            productsSold.set(item.id, { id: item.id, name: item.name, quantity: item.quantity });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error fetching payment intents:', error);
  }

  return Array.from(productsSold.values());
}

// Testes apartir daqui
export const createProduct = async (
  name: string,
  description: string,
  imageUrl: string,
  price: number,
  currency: string = 'brl' 
): Promise<Stripe.Product> => {
  console.log('Creating product with the following details:');
  console.log(`Name: ${name}`);
  console.log(`Description: ${description}`);
  console.log(`Image URL: ${imageUrl}`);
  console.log(`Price: ${price} (in cents)`);
  console.log(`Currency: ${currency}`);

  try {

    const product = await stripe.products.create({
      name,
      description,
      images: [imageUrl],
    });

    const productPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: price,
      currency,
    });

    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};


// Criar Cliente
export const createCustomer = async (email: string, name: string, description?: string) => {
  return stripe.customers.create({
    email,
    name,
    description,
  });
};

// Atualizar Cliente
export const updateCustomer = async (customerId: string, name: string, email: string): Promise<Stripe.Customer> => {
  try {
    const customer = await stripe.customers.update(customerId, {
      name,
      email,
    });
    return customer;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

// Deletar cliente

export const deleteCustomer = async (customerId: string ): Promise<Stripe.DeletedCustomer> => {
  try {
    const deletedCustomer = await stripe.customers.del(customerId);
    return deletedCustomer;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};
