// pages/api/product/[sku].ts
import { NextApiRequest, NextApiResponse } from 'next';
import productData from '../../../public/product-fixtures.json'; // Replace with your data source

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { sku } = req.query;

  if (!sku) {
    res.status(400).json({ error: 'SKU is required' });
    return;
  }

  const product = productData.find(item => item.sku === sku);

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  try {
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};
