import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Bem-vindo ao Bebidas Store 🍹</h1>
        <p className="subtitle">
          Descubra as melhores bebidas alcoólicas para todas as ocasiões.
        </p>
        <div className="hero-image">
          {/* Imagem temática de bebidas */}
        </div>
        <button className="shop-button">Explorar Produtos</button>
      </header>

      <section className="featured-products">
        <h2>Produtos em Destaque</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="url-da-imagem1" alt="Produto 1" />
            <p className="product-name">Vinho Tinto Especial</p>
            <p className="product-price">R$ 89,90</p>
          </div>
          <div className="product-card">
            <img src="url-da-imagem2" alt="Produto 2" />
            <p className="product-name">Cerveja Artesanal</p>
            <p className="product-price">R$ 19,90</p>
          </div>
          <div className="product-card">
            <img src="url-da-imagem3" alt="Produto 3" />
            <p className="product-name">Whisky Premium</p>
            <p className="product-price">R$ 199,90</p>
          </div>
        </div>
      </section>

      <footer className="App-footer">
        <p>&copy; 2024 Bebidas Store. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
