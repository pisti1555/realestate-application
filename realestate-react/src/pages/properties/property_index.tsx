import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import '../../css/PropertyIndex.css';

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
        return <p>Loading...</p>;
    }

    if (errors) {
        return <p>{errors}</p>;
    }

    return (
        <>
            <ul className="list">
                {properties.map((property: any) => (
                    <li key={property.id} className="item">
                        <div className="content">
                            <img src={property.image} />
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
        </>
    );
}

export default Property_Index;
