import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import loader from "../assets/loader.gif";

export default function CurrencyConverter() {
  const [currencies, Setcurrencies] = useState([]);
  const [amount, Setamount] = useState(1);

  const [fromcurrency, Setfromcurrency] = useState("USD");
  const [tocurrency, Settocurrency] = useState("INR");

  const [convertedamt, Setconvertedamt] = useState(null);
  const [isload, SetisLoad] = useState(false);

  const [fav, Setfav] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR"]
  );

  const getCurr = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      Setcurrencies(Object.keys(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurr();
  }, []);

  const currConvertor = async (e) => {
    e.preventDefault();
    if (!amount || amount == 0) {
      Setconvertedamt(0);
      return;
    }
    SetisLoad(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromcurrency}&to=${tocurrency}`
      );
      const data = await res.json();
      Setconvertedamt(data.rates[tocurrency]);
    } catch (error) {
      console.log(error);
    } finally {
      SetisLoad(false);
    }
  };

  const handleFav = (c) => {
    let updatedFav = [...fav];
    if (fav.includes(c)) {
      updatedFav = updatedFav.filter((f) => f !== c);
    } else {
      updatedFav.push(c);
    }
    Setfav(updatedFav);
    localStorage.setItem("favorites", JSON.stringify(updatedFav));
  };
  const rev = () => {
    Setfromcurrency(tocurrency);
    Settocurrency(fromcurrency);
  };

  return (
    <div className="c-box">
      <h2 className="c-header">Currency Converter</h2>
      <div className="select-box">
        <CurrencyDropdown
          currencies={currencies}
          title="From :"
          currency={fromcurrency}
          setcurrency={Setfromcurrency}
          handleFav={handleFav}
          fav={fav}
        />
        <button onClick={rev} className="rev-btn">
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
        </button>
        <CurrencyDropdown
          currencies={currencies}
          title="To :"
          currency={tocurrency}
          setcurrency={Settocurrency}
          handleFav={handleFav}
          fav={fav}
        />
      </div>
      <form action="">
        <div className="inputBox">
          <h4>Amount :</h4>
          <input
            type="number"
            value={amount}
            onChange={(e) => Setamount(e.target.value)}
          />
        </div>
        <div className="msg">
          {convertedamt && `Converted Amount : ${convertedamt} ${tocurrency}`}
        </div>
        <button className="c-btn" onClick={(e) => currConvertor(e)}>
          Convert
          {isload && <img src={loader} alt="" />}
        </button>
      </form>
    </div>
  );
}
