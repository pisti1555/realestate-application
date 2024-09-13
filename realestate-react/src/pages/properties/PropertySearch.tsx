import React, { useEffect } from "react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { searchProperties } from "../../services/property";
import { Search } from "@mui/icons-material";

import page_style from '../../css/property/property_search/PropertySearchPage.module.css';
import form_style from '../../css/property/property_search/SearchPropertyForm.module.css';
import results_style from '../../css/property/property_search/PropertyResults.module.css';

import { PropertyInterface_Search, PropertyInterface_Get } from "../../interface/property/PropertyInterface";
import Loading from "../../components/pages/loading/Loading";
import ErrorPage from "../../components/pages/error/Error";


const PropertySearch = () => {
  const [properties, setProperties] = useState<PropertyInterface_Get[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>('');
  const [form, setForm] = useState<PropertyInterface_Search>({
    query: "",
    minPrice: 0,
    maxPrice: 999999,
    minRating: 0,
    maxRating: 5,
    orderby: 'date-desc'
  });

  useEffect(() => {
      searchProperties(form).then((response) => {
      setProperties(response);
    }).catch((error) => {
      setErrors(error.message);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await searchProperties(form);
    setProperties(response);
  }

  if (loading) {
    return(
      <Loading />
    );
  }

  if (errors) {
    return (
      <ErrorPage errors={errors} />
    );
  }
  
  return (
    <div className={page_style.property_search_container}>
      <form className={form_style.search_form} onSubmit={handleSubmit}>
        <div className={form_style.text_search_container}>
          <div className={form_style.text_input_container}>
            <Search />
            <input 
              type="text" 
              placeholder="start typing..." 
              value={form.query}
              onChange={(e) => setForm({...form, query: e.target.value})}
            />  
          </div>
        </div>
        <div className={form_style.range_container}>
          <div className={form_style.price_range_container}>
            <label htmlFor="price-range">Price Range:</label>
            <input
              type="range"
              className={form_style.range_input}
              id="price-range-min"
              min="0"
              max={form.maxPrice}
              step="10"
              value={form.minPrice}
              onChange={(e) => setForm({...form, minPrice: Number(e.target.value)})}
            />
            <input
              type="range"
              className={form_style.range_input}
              id="price-range-max"
              min={form.minPrice}
              max="999999"
              step="10"
              value={form.maxPrice}
              onChange={(e) => setForm({...form, maxPrice: Number(e.target.value)})}
            />
            <div className={form_style.range_values}>
              <span>Min Price: {form.minPrice}$</span>
              <span>Max Price: {form.maxPrice}$</span>
            </div>
          </div>
          <div className={form_style.rating_range_container}>
            <label htmlFor="rating-range">Rating Range:</label>
            <input
              type="range"
              className={form_style.range_input}
              id="rating-range-min"
              min="0"
              max={form.maxRating}
              step="0.1"
              value={form.minRating}
              onChange={(e) => setForm({...form, minRating: Number(e.target.value)})}
            />
            <input
              type="range"
              className={form_style.range_input}
              id="rating-range-max"
              min={form.minRating}
              max="5"
              step="0.1"
              value={form.maxRating}
              onChange={(e) => setForm({...form, maxRating: Number(e.target.value)})}
            />
            <div className={form_style.range_values}>
              {form.minRating < 1 ? (
                <span>Min rating: not rated</span>
              ) : (
                <span>Min Rating: {form.minRating}</span>
              )}
              <span>Max Rating: {form.maxRating}</span>
            </div>
          </div>
        </div>
        <div className={form_style.order_by_container}>
          <label htmlFor="order-by">Order by</label>
          <select id="order-by" onChange={(e) => setForm({...form, orderby: e.target.value})}>
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="rating-desc">Top rated</option>
            <option value="price-asc">Cheapest first</option>
            <option value="price-desc">Most expensive first</option>
          </select>
        </div>
        <div className={form_style.button_container}>
          <button type="submit" className={form_style.submit_button}>Search</button>
        </div>
      </form>

      <div className={results_style.property_results}>
        {properties.length === 0 ? (
          <div className={results_style.not_found}>
            <h1>No properties found</h1>
          </div>
        ) : (
          <ul className={results_style.list}>
            {properties.map((property: any) => (
              <li key={property.id} className={results_style.item}>
                <div className={results_style.content}>
                  <img src={property.image} alt={property.title} />
                  <div className={results_style.info}>
                    <strong>{property.title}</strong>
                    <p>Price: {property.price}$</p>
                    {property.rating === 0 ? (
                      <p>Rating: unrated</p>
                    ) : (
                      <p>Rating: {property.rating}</p>
                    )}
                    <p>Location: {property.city}, {property.postal_code}</p>
                  </div>
                </div>
                <div className={results_style.btn_container}>
                  <Link to={'/properties/' + property.id} className={results_style.kkk}>Show</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PropertySearch;