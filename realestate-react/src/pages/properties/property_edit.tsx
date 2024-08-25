import React from "react";
import { useState, useEffect, FormEvent} from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { editProperty } from "../../services/property";
import { PropertyInterface_Store } from "../../interface/property/propertyInterface";
import ErrorPage from "../../components/pages/error/Error";
import Loading from "../../components/pages/loading/Loading";


const Property_Edit = () => {
    const { id } = useParams();

    const [form, setForm] = useState<PropertyInterface_Store>({
        image: null,
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
        api.get('/is-own-property/' + id).then(response => {
            if (response.status === 200) {
                setPermission(true);
            }
        }).catch((error) => {
            setErrors(error);
        });

        api.get('/properties/' + id)
        .then(
            response => {
                if (response.status === 200) {
                    const data = response.data.data;
                    setForm({
                        image:null, 
                        title: data.title,
                        price: data.price,
                        city: data.city,
                        postal_code: data.postal_code,
                        address: data.address,
                        description: data.description,
                    });
                }
            }
        ).catch((error) => {
            setErrors(error.message);
        }).finally(() => {
            setLoading(false);
        });
    });

    useEffect(() => {
        if (success) {
            navigate('/user?property-created-success');
        }
    }, [success, navigate]);

    const handleImage = (e:any) => {
        if (e.target.files && e.target.files.length > 0) {
          setForm({...form, image: e.target.files[0]});
        }
      };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        const response = await editProperty(id??'', form);
        if (response.status === true) {
            setErrors('');
            setSuccess(true);
        } else {
            setErrors(response.message); 
        }
        } catch (error:any) {
            console.log(error);
            
            setErrors(error.message);
            setSuccess(false);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    if (!permission) {
        return (
            <ErrorPage errors={"You do not have permission to visit this page"} />
        );
    }

    return (
        <div className="container">
            <h1>Edit this property</h1>
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImage}
                    />
                </div>
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
                        onChange={(e) => setForm({...form, price:Number(e.target.value)})}
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Property_Edit;