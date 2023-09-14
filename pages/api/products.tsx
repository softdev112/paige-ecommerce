// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import productData from '../../public/product-fixtures.json'; // Replace with your data source

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({ products: productData });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};
