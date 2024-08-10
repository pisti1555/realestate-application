import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const Property_Index = () => {
    const [property, setProperty] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        api.get('/properties/' + id)
            .then((response) => {
                setProperty(response.data.data);              
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
            { 
                <div>
                    <a href={'/properties/edit/' + property.id}>Edit</a>
                    <h1>{property.title}</h1>
                    <h3>{property.price}</h3>
                    <p>{property.city}</p>
                    <p>{property.postal_code}</p>
                    <p>{property.address}</p>
                    <p>{property.description}</p>
                </div>
            }
        </>
    );
}

export default Property_Index;
