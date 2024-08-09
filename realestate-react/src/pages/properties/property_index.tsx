import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

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
            <ul>
                {properties.map((property: any) => (
                    <li key={property.id}>
                        <Link to={'/properties/' + property.id}>
                            <h1>{property.title}</h1>
                            <h3>{property.price}</h3>
                            <p>{property.city}</p>
                            <p>{property.postal_code}</p>
                            <p>{property.address}</p>
                            <p>{property.description}</p>
                        </Link>
                        
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Property_Index;
