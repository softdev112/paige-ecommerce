// pages/product-detail/[sku].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Product } from '../public/types';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  const router = useRouter();

  const defaultProduct: Product = {
    id: '',
    sku: '',
    name: '',
    type: '',
    description: '',
    color: '',
    price: 0
  };
  const [product, setProduct] = useState<Product | null>(defaultProduct);

  useEffect(() => {

  }, []);

  const handleUpdate = async (updatedProduct: Product) => {
    // Implement update logic here
    // You can update the product in your data source (e.g., data.json)
    // and then redirect back to the product list page
    // For simplicity, this example doesn't include the actual update logic.
    updatedProduct.sku = updatedProduct.name.toLowerCase();
    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct), // Send your updated product data
      });

      if (response.ok) {
        // Product updated successfully, you can navigate back to the product list
        alert('Product added successfully.');
        router.push('/product-list');
      } else {
        // Handle errors here
        console.error('Error adding product:', response.statusText);
        alert(`Error adding product. ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error adding product. ${error}`);
    }
  };

  const handleCancel = () => {
    router.back();
  }

  return (
    <div>
      {product ? (
        <ProductForm isEdit={false} product={product} onUpdate={handleUpdate} onCancel={handleCancel} onDelete={()=> {}}/>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default AddProduct;
