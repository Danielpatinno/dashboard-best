import { createCustomer } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath } from 'next/cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, description } = req.body;

    try {
      const customer = await createCustomer(email, name, description);

      res.status(200).json(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Error creating customer' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
