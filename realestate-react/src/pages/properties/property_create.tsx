import React from "react";
import { useState, useEffect, FormEvent} from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../../services/property";

const Property_Create = () => {
    const [form, setForm] = useState<any>({
        title: '',
        price: 0,
        city: '',
        postal_code: '',
        address: '',
        description: ''
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [permission, setPermission] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user').then(response => {
            if (response.data.role == 'agent') setPermission(true);
        }).catch((error) => {
            setErrors(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [success]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        const response = await createProperty(form);
        if (response.status == true) {
            setErrors('');
            setSuccess(true);
        } else {
            setErrors(response.message);
        }
        } catch (error:any) {
            setErrors(error.message);
            setSuccess(false);
        }
    };

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!permission) {
        return (
            <div>
                <p>You do not have permission to visit this page</p>
            </div>
        );
    }

    if (success) {
        navigate('/user?property-created-success');
    }

    return (
        <div className="container">
            <h1>Create a new property</h1>
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={(e) => setForm({...form, title:e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={(e) => setForm({...form, price:e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={(e) => setForm({...form, city:e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postal_code">Postal code</label>
                    <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={form.postal_code}
                        onChange={(e) => setForm({...form, postal_code:e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={(e) => setForm({...form, address:e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={(e) => setForm({...form, description:e.target.value})}
                        required
                    />
                </div>
                {errors && <p>{errors}</p>}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Property_Create;