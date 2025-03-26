
import React, { useState } from "react";

import "./App.css";
import BarcodeReader from "./components/BarCodeReader";
import BarcodeScanner from "./components/BarCodeScanner";

function App() {
  return (
    <div className="app">
      <h1>React Barcode Scanner</h1>
      <div className="scanner-container">
        <BarcodeReader />

        <BarcodeScanner />

      </div>

    </div>
  );
}

export default App;
