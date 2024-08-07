import { updateCustomer } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { newEmail, newName, id } = req.body;

    if (!id || !newEmail || !newName) {
      return res.status(400).json({ error: 'Customer ID, email, and name are required' });
    }

    try {
      const updatedCustomer = await updateCustomer(id, newName, newEmail);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Error updating customer' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
