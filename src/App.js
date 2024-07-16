import React from 'react';
import './App.css'; // Import CSS file for styling
import CarPriceForm from './CarPriceForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Car Price Predictor</h1>
      </header>
      <main className="App-main">
        <CarPriceForm />
      </main>
    </div>
  );
}

export default App;
