import React from 'react';

const ProductPage = ({ product }) => {
  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>Preço: R${product.price}</p>
        <button>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
};

export default ProductPage;
