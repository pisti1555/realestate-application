import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PropertyInterface_Get } from "../../interface/property/PropertyInterface";
import ErrorPage from "../../components/pages/error/Error";
import Loading from "../../components/pages/loading/Loading";
import api from "../../services/api";
import '../../css/PropertyShow.css';
import { ArrowBack } from "@mui/icons-material";

const Property_Show = () => {
    const [property, setProperty] = useState<PropertyInterface_Get | null>(null);
    const [permission, setPermission] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        api.get('/is-own-property/' + id).then(response => {
            if (response.status === 200) {
                setPermission(true);
            }
        }).catch((error) => {
            setPermission(false);
        });

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
    }, [id]);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (!property || errors) {
        return (
            <ErrorPage errors={errors} />
        );
    }

    return (
        <div className="property-show-page">
            <Link  to='/properties' className="button-container">
                <ArrowBack />
                <p>Back</p>
            </Link>
            
            <div className="img-container">
                <img src={property.image} alt={property.title} />
            </div>

            {permission ? (
                <Link to={'/properties/edit/' + property.id} id="edit-button">Edit</Link>    
            ) : null}
            
            <section className="title-section">
                <h1>{property.title}</h1>
                <h2>{property.price}$</h2>
            </section>
            <section className="location-section">
                <p>{property.city}</p>
                <p>{property.postal_code}</p>
                <p>{property.address}</p>
            </section>
            <section className="description-section">
                <p>{property.description}</p>
            </section>
        </div>
    );
}

export default Property_Show;
