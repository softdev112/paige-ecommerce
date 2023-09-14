// pages/product-detail/[sku].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Product } from '../../public/types';
import ProductForm from '../../components/ProductForm';

const ProductDetail = () => {
  const router = useRouter();
  const { sku } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${sku}`); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
          setEditedProduct(data.product);
        } else {
          console.error('Error fetching product:', response.statusText);
          router.push('/product-list');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/product-list');
      }
    };

    if (sku) {
      fetchProduct();
    }
  }, [sku, router]);

  const handleUpdate = async (updatedProduct: Product) => {
    // Implement update logic here
    // You can update the product in your data source (e.g., data.json)
    // and then redirect back to the product list page
    // For simplicity, this example doesn't include the actual update logic.
    try {
      const response = await fetch('/api/updateProduct', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct), // Send your updated product data
      });

      if (response.ok) {
        // Product updated successfully, you can navigate back to the product list
        alert('Product updated successfully.');
        router.push('/product-list');
      } else {
        // Handle errors here
        console.error('Error updating product:', response.statusText);
        alert(`Error updating product. ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`Error updating product. ${error}`);
    }
  };

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
        router.push('/product-list');
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

  const handleCancel = () => {
    router.back();
  }

  return (
    <div>
      {product ? (
        <ProductForm isEdit={true} product={product} onUpdate={handleUpdate} onCancel={handleCancel} onDelete={handleDelete}/>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
