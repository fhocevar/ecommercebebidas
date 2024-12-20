import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const AddProduct = () => {
  const { user } = useAuth();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:3000/products', product, {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviando o token JWT para autenticação
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};
export default AddProduct;