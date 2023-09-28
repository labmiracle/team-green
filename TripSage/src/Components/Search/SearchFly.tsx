import { useEffect, useState } from "react";
import "./SearchFly.scss";

interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    //solicitud al backend para obtener los productos
    fetch("/api/products")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProducts(data);
      });
  }, []);

  return (
    <div className="product-list">
      <h2>
        Lista de Productos <hr />
      </h2>

      <div className="list__container">
        <ul className="list__ul">
          {/* {products.map(function (product) {
          return (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          );
        })} */}

          <li className="list__li">Destino</li>
          <li className="list__li">Fecha de salida</li>
          <li className="list__li">Fecha de llegada</li>
          <li className="list__li">Precio</li>
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
