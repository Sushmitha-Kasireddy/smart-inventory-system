import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8080/api/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    await axios.post("http://localhost:8080/api/products", {
      name, description, quantity, price
    });
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Inventory System</h1>
      <div className="mb-4">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-1 mr-2" />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-1 mr-2" />
        <input placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(+e.target.value)} className="border p-1 mr-2" />
        <input placeholder="Price" type="number" value={price} onChange={e => setPrice(+e.target.value)} className="border p-1 mr-2" />
        <button onClick={addProduct} className="bg-blue-500 text-white px-2 py-1">Add</button>
      </div>
      <ul>
        {products.map(p => (
          <li key={p.id} className="mb-2">
            <span className="mr-2">{p.name} - {p.description} - Qty: {p.quantity} - ${p.price}</span>
            <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;