import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
   
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
