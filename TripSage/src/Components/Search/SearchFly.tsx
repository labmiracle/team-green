import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Aquí puedes hacer una solicitud al backend para obtener los productos
    // Ejemplo ficticio de solicitud a una API:
    fetch('/api/products')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProducts(data);
      });
  }, []);

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(function (product) {
          return (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;