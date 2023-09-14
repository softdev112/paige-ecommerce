// components/ProductTable.tsx
import { useState } from 'react';
import { Product } from '../public/types';
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '@mui/material';

interface ProductTableProps {
  products: Product[];
  selectedColor: string;
  handleColorFilterChange: (event: SelectChangeEvent)=> void;
  onDelete: (sku: string) => void;
  onEdit: (sku: string) => void;
  onAdd: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  products, selectedColor, handleColorFilterChange, onDelete, onEdit, onAdd }) => {

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <FormControl variant="outlined" style={{ minWidth: '150px', marginRight: '20px' }}>
            <InputLabel htmlFor="colorFilter">Filter by Color</InputLabel>
            <Select
              label="Filter by Color"
              value={selectedColor}
              onChange={handleColorFilterChange}
              id="colorFilter"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="brown">Brown</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="pink">Pink</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={onAdd} // Replace with your Add Product route
          >
            Add Product
          </Button>
        </div>
        {products.length > 0 ? <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onEdit(product.sku)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDelete(product.sku)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> : <h1>Loading</h1>}
        
      </Paper>
    </Container>
  );
};

export default ProductTable;
