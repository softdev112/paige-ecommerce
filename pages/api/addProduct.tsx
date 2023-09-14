// pages/api/addProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/public/types';

const productsFilePath = path.join(process.cwd(), 'public/product-fixtures.json');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, type, description, color, price } = req.body;

  if ( !name || !type || !description || !color || !price) {
    res.status(400).json({ error: 'Invalid request body' });
    return;
  }

  try {
    const currentData = await fs.readFile(productsFilePath, 'utf-8');
    let products = JSON.parse(currentData);

    // const index = products.findIndex((product: Product) => product.sku === sku);

    // if (index === -1) {
    //   res.status(404).json({ error: 'Product not found' });
    //   return;
    // }

    const id = (new Date().getUTCMilliseconds()).toString();
    const sku = name.toLowerCase();
    products.push({
      id,
      sku,
      name,
      type,
      description,
      color,
      price,
    });
    console.log("new products", products);

    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding product' });
  }
};
