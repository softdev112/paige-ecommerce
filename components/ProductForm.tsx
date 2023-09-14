// components/ProductForm.tsx
import { useState } from 'react';
import { Product } from '../public/types';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import Sku from '@/pages/api/product/[sku]';

interface ProductFormProps {
  isEdit: boolean;
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
  onCancel: () => void;
  onDelete: (sku: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ isEdit, product, onUpdate, onCancel, onDelete}) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({ ...editedProduct, name: event.target.value });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({ ...editedProduct, type: event.target.value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({ ...editedProduct, description: event.target.value });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({ ...editedProduct, color: event.target.value });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(event.target.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      setEditedProduct({ ...editedProduct, price: newPrice });
    }
  };

  const validateForm = () => {
    // Implement validation for type, description, and color
    if (
      editedProduct?.type.trim() === '' ||
      editedProduct?.description.trim() === '' ||
      editedProduct?.color.trim() === ''
    ) {
      alert('Type, description, and color are required fields.');
      return false;
    }
    // Implement validation for price
    if (!validatePrice(editedProduct?.price)) {
      alert('Price must be a non-negative number.');
      return false;
    }
    return true;
  };

  const validatePrice = (price: number | undefined): boolean => {
    return !isNaN(price as number) && price as number >= 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      // Implement your logic to save the edited data here
      // For example: send a PUT request to update the product
      // After updating, route back to the /product-list page
      console.log("Edited Product", editedProduct);
      onUpdate(editedProduct);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4">{isEdit ? 'Product Detail' : 'New Product'}</Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            value={editedProduct?.name}
            onChange={handleNameChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Type"
            value={editedProduct?.type}
            onChange={handleTypeChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={editedProduct?.description}
            onChange={handleDescriptionChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Color"
            value={editedProduct?.color}
            onChange={handleColorChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            value={editedProduct?.price}
            onChange={handlePriceChange}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              style={{ margin: '10px'}}
            >
              {isEdit ? 'Update': 'Add Product'}
            </Button>
            {isEdit ? <Button
              variant="contained"
              color="secondary"
              onClick={() => {onDelete(product.sku)}}
              style={{ margin: '10px'}}
            >
              Delte
            </Button>: <div />}
            <Button
              onClick={onCancel}
              style={{ margin: '10px'}}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductForm;
