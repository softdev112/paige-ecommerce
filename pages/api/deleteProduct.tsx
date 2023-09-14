// pages/api/addProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/public/types';

const productsFilePath = path.join(process.cwd(), 'public/product-fixtures.json');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const productId = req.query.sku;

  try {
    const currentData = await fs.readFile(productsFilePath, 'utf-8');
    let products = JSON.parse(currentData);

    const index = products.findIndex((product: Product) => product.sku === productId);

    if (index === -1) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    products.splice(index, 1);
    console.log("delete products", products);

    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};
