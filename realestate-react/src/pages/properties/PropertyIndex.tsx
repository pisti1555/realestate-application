import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { PropertyInterface_Get } from "../../interface/property/PropertyInterface";
import css from '../../css/property/PropertyIndex.module.css';
import Loading from "../../components/pages/loading/Loading";
import ErrorPage from "../../components/pages/error/Error";

const PropertyIndex = () => {
    const [properties, setProperties] = useState<PropertyInterface_Get[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string>('');

    useEffect(() => {
        api.get('/properties')
            .then((response) => {
                setProperties(response.data.data);
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrors(error.response.data.message);
                    return;
                } 
                if (error.message) {
                    setErrors(error.message);
                    return;
                }
                setErrors("Unexpected error");
            })
            .finally(() => {
                setLoading(false);  
            });
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (errors) {
        return (
            <ErrorPage errors={errors} />
        );
    }

    return (
        <div className={css.property_index}>
            {properties.length > 0 ? (
                properties.map((property) => (
                    <div key={property.id} className={css.item}>
                        <img src={property.image} alt={property.title} />
                        <div className={css.info}>
                            <strong>{property.title}</strong>
                            <p>Price: {property.price}$</p>
                            <p>Location: {property.city}, {property.postal_code}</p>
                        </div>
                        <div className={css.button_container}>
                            <Link to={'/properties/' + property.id}>See more</Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className={css.not_found}>
                    <h1>No properties found</h1>
                </div>
            )}
        </div>
    );
}

export default PropertyIndex;
