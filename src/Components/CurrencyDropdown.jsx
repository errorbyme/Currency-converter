import React from "react";

export default function CurrencyDropdown({
  currencies,
  title = "",
  handleFav,
  currency,
  setcurrency,
  fav,
}) {
  let isFav = (c) => fav.includes(c);
  return (
    <div className="">
      <label htmlFor="title">{title}</label>
      <div className="inner-box">
        <img
          src={`https://flagsapi.com/${currency.substring(0, 2)}/flat/64.png`}
        />
        <select
          value={currency}
          onChange={(e) => setcurrency(e.target.value)}
          name=""
          id=""
        >
          {fav.map((c) => {
            return (
              <option value={c} key={c}>
                {c}
              </option>
            );
          })}
          {currencies
            ?.filter((c) => !fav.includes(c))
            .map((c) => {
              return (
                <option value={c} key={c}>
                  {c}
                </option>
              );
            })}
        </select>
        <button onClick={() => handleFav(currency)} className="fav">
          {isFav(currency) ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </button>
      </div>
    </div>
  );
}
