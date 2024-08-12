import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyConverter from "./Components/CurrencyConverter";

export default function App() {
  return (
    <div className="container center">
      <CurrencyConverter />
    </div>
  );
}
