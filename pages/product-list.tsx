// pages/product-list.tsx
import router, { useRouter } from 'next/router';
import ProductTable from '../components/ProductTable';
import { useEffect, useState } from 'react';
import { Product } from '../public/types';
import { SelectChangeEvent } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleColorFilterChange = (
    event: SelectChangeEvent) => {
    setSelectedColor(event.target.value as string);
  };

  const filteredProducts: Product[] = selectedColor
    ? products.filter((product: Product) => product.color === selectedColor)
    : products;

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error('Error fetching products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  useEffect(() =>  {

    fetchProducts();
  }, []);


  const handleDelete = async (sku: string) => {
    try {
      const response = await fetch(`/api/deleteProduct?sku=${sku}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Product updated successfully, you can navigate back to the product list
        alert('Product deleted successfully.');
        fetchProducts();
      } else {
        // Handle errors here
        console.error('Error deleting product:', response.statusText);
        alert(`Error deleting product. ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Error deleting product. ${error}`);
    }
  };

  const handleEdit = (sku: string) => {
    router.push(`/product-detail/${sku}`);
  };

  const handleAddProduct = () => {
    router.push(`/add-product`);
  };

  return (
    <ProductTable 
      products={filteredProducts} 
      selectedColor={selectedColor} 
      handleColorFilterChange={handleColorFilterChange} 
      onDelete={handleDelete} 
      onEdit={handleEdit} 
      onAdd={handleAddProduct}
    />
  );
};

export default ProductList;
