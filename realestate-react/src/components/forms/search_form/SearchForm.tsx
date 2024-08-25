import React from "react";
import { FormEvent } from "react";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import '../search_form/SearchPropertyForm.css';

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
}

export const SearchPropertyForm = () => {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);
  const [orderBy, setOrderBy] = useState('date-desc');

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="text-search-container">
        <div className="text-input-container">
          <Search />
          <input type="text" placeholder="start typing..." />  
        </div>
      </div>
      <div className="range-container">
        <div className="price-range-container">
          <label htmlFor="price-range">Price Range:</label>
          <input
            type="range"
            className="range-input"
            id="price-range"
            min="100"
            max={maxPrice}
            step="10"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="range"
            className="range-input"
            id="price-range"
            min={minPrice}
            max="99999"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <div className="range-values">
            <span>Min Price: {minPrice}$</span>
            <span>Max Price: {maxPrice}$</span>
          </div>
        </div>
        <div className="rating-range-container">
          <label htmlFor="rating-range">Rating Range:</label>
          <input
            type="range"
            className="range-input"
            id="rating-range"
            min="1"
            max={maxRating}
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          />
          <input
            type="range"
            className="range-input"
            id="rating-range"
            min={minRating}
            max="5"
            step="0.1"
            value={maxRating}
            onChange={(e) => setMaxRating(Number(e.target.value))}
          />
          <div className="range-values">
            <span>Min Rating: {minRating}</span>
            <span>Max Rating: {maxRating}</span>
          </div>
        </div>
      </div>
      <div className="order-by-container">
        <label htmlFor="order-by">Order by</label>
        <select id="order-by" onChange={(e) => {setOrderBy(e.target.value)}}>
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="rating-desc">Top rated</option>
          <option value="price-asc">Cheapest first</option>
          <option value="price-desc">Most expensive first</option>
        </select>
      </div>
      <div className="button-container">
        <button type="submit" className="submit-button">Search</button>
      </div>
    </form>
  );
}