import { useEffect, useState } from "react";
import "./SearchFly.scss";
import "./loader.scss";

interface Product {
  id: number;
  name: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Simulación de una solicitud al backend para obtener los productos
    // Aquí puedes reemplazar esta simulación con tu lógica real.
    setTimeout(() => {
      //solicitud al backend para obtener los productos
      // fetch("/api/products")
      //   .then(function (response) {
      //     return response.json();
      //   })
      //   .then(function (data) {
      //     setProducts(data);
      //   });

      const fakeProducts = [
        { id: 1, name: "Producto 1", price: 10 },
        { id: 2, name: "Producto 2", price: 20 },
        // ... Agrega más productos aquí
      ];
      setProducts(fakeProducts);
    }, 500); // Simulación de tiempo de carga
  }, []);

  return (
    <>
      {showLoader && <span className="loader"></span>}
      {!showLoader && (
        <div className="product-list">
          <div>
            <h2>
              Lista de Productos <hr />
            </h2>

            <div className="list__container">
              <ul className="list__ul">
                <li className="list__li">Destino</li>
                <li className="list__li">Fecha de salida</li>
                <li className="list__li">Fecha de llegada</li>
                <li className="list__li">Precio</li>
              </ul>

              <div className="list__product">
                {products.map(function (product) {
                  return (
                    <span className="product__span" key={product.id}>
                      {product.name} - ${product.price}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
