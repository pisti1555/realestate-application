import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import '../../css/PropertyIndex.css';
import Loading from "../../components/pages/loading/Loading";
import ErrorPage from "../../components/pages/error/Error";

const Property_Index = () => {
    const [properties, setProperties] = useState<any[]>([]);
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
        <>
            {properties? (
                <ul className="list">
                    {properties.map((property: any) => (
                        <li key={property.id} className="item">
                            <div className="content">
                                <img src={property.image} alt="" />
                                <div className="info">
                                    <strong>{property.title}</strong>
                                    <p>Price: {property.price}$</p>
                                    <p>Location: {property.city}, {property.postal_code}</p>
                                </div>
                            </div>
                            <div className="btn-container">
                                <Link to={'/properties/' + property.id} className="button shadow-br">Show</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="not-found">
                    <h1>No properties found</h1>
                </div>
            )}
        </>
    );
}

export default Property_Index;
