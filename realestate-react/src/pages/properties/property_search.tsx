import React, { useEffect } from "react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { searchProperties } from "../../services/property";
import { Search } from "@mui/icons-material";
import '../../css/property_search/PropertySearchPage.css';
import { PropertyInterface_Search } from "../../interface/property/propertyInterface";
import Loading from "../../components/pages/loading/Loading";
import ErrorPage from "../../components/pages/error/Error";


const Property_Search = () => {
  const [properties, setProperties] = useState<any[]>([]);
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
  }, [form.query]);

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
    <div className="property-search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="text-search-container">
          <div className="text-input-container">
            <Search />
            <input 
              type="text" 
              placeholder="start typing..." 
              value={form.query}
              onChange={(e) => setForm({...form, query: e.target.value})}
            />  
          </div>
        </div>
        <div className="range-container">
          <div className="price-range-container">
            <label htmlFor="price-range">Price Range:</label>
            <input
              type="range"
              className="range-input"
              id="price-range"
              min="0"
              max={form.maxPrice}
              step="10"
              value={form.minPrice}
              onChange={(e) => setForm({...form, minPrice: Number(e.target.value)})}
            />
            <input
              type="range"
              className="range-input"
              id="price-range"
              min={form.minPrice}
              max="999999"
              step="10"
              value={form.maxPrice}
              onChange={(e) => setForm({...form, maxPrice: Number(e.target.value)})}
            />
            <div className="range-values">
              <span>Min Price: {form.minPrice}$</span>
              <span>Max Price: {form.maxPrice}$</span>
            </div>
          </div>
          <div className="rating-range-container">
            <label htmlFor="rating-range">Rating Range:</label>
            <input
              type="range"
              className="range-input"
              id="rating-range"
              min="0"
              max={form.maxRating}
              step="0.1"
              value={form.minRating}
              onChange={(e) => setForm({...form, minRating: Number(e.target.value)})}
            />
            <input
              type="range"
              className="range-input"
              id="rating-range"
              min={form.minRating}
              max="5"
              step="0.1"
              value={form.maxRating}
              onChange={(e) => setForm({...form, maxRating: Number(e.target.value)})}
            />
            <div className="range-values">
              {form.minRating < 1 ? (
                <span>Min rating: not rated</span>
              ) : (
                <span>Min Rating: {form.minRating}</span>
              )}
              <span>Max Rating: {form.maxRating}</span>
            </div>
          </div>
        </div>
        <div className="order-by-container">
          <label htmlFor="order-by">Order by</label>
          <select id="order-by" onChange={(e) => setForm({...form, orderby: e.target.value})}>
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

      <div className="property-results">
        {properties.length === 0 ? (
          <div className="not-found">
            <h1>No properties found</h1>
          </div>
          ) : (
            <ul className="list">
              {properties.map((property: any) => (
                <li key={property.id} className="item">
                  <div className="content">
                    <img src={property.image} alt="" />
                    <div className="info">
                      <strong>{property.title}</strong>
                      <p>Price: {property.price}$</p>
                      {property.rating === 0?(
                        <p>Rating: unrated</p>
                      ):(
                        <p>Rating: {property.rating}</p>
                      )}
                      <p>Location: {property.city}, {property.postal_code}</p>
                    </div>
                  </div>
                  <div className="btn-container">
                      <Link to={'/properties/' + property.id} className="submit-button">Show</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}

export default Property_Search;