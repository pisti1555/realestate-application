import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../../components/pages/error/Error";
import Loading from "../../components/pages/loading/Loading";
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
            { 
                <div>
                    <a href={'/properties/edit/' + property.id}>Edit</a>
                    <img src={property.image} />
                    <h1>{property.title}</h1>
                    <h3>{property.price}$</h3>
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
