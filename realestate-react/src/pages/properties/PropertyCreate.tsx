import React from "react";
import { useState, useEffect, FormEvent} from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { createProperty } from "../../services/property";
import { PropertyInterface_Store } from "../../interface/property/PropertyInterface";
import Loading from "../../components/pages/loading/Loading";
import ErrorPage from "../../components/pages/error/Error";
import '../../css/property_agent/PropertyCreatePage.css';

const Property_Create = () => {
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
        api.get('/user').then(response => {
            if (response.data.role === 'agent') setPermission(true);
        }).catch((error) => {
            setErrors(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

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
        const response = await createProperty(form);
        
        if (response.status === true) {
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
            <Loading />
        );
    }

    if (!permission) {
        return (
            <ErrorPage errors={"You do not have permission to visit this page"} />
        );
    }

    return (
        <div className="property-container">
            <h1>Create a new property</h1>
            <form onSubmit={handleSubmit} className="property-form">
                <h2 className="group-text">Upload an Image</h2>
                <div className="image-input">
                    {form.image? (
                        <label className="image-upload-label">
                            <div className="image-container">
                                <img src={URL.createObjectURL(form.image)} alt="" />
                                <p>{form.image.name}</p>
                                <span className="browse-button">Choose another image</span>
                            </div>
                            <input 
                                id="image" 
                                type="file" 
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </label>
                    ) : (
                        <label className="image-upload-label">
                            <div className="image-upload-design">
                                <svg viewBox="0 0 640 512" height="1em">
                                    <path
                                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                    ></path>
                                </svg>
                                <p>Drag and Drop</p>
                                <p>or</p>
                                <span className="browse-button">Choose an image</span>
                            </div>
                            <input 
                                id="image" 
                                type="file" 
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </label>
                    )}
                </div>
                
                <h2 className="group-text">Main data</h2>
                <div className="flex-horizontal">
                    <div className="property-group">
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
                    <div className="property-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={form.price}
                            onChange={(e) => setForm({...form, price: Number(e.target.value)})}
                            required
                        />
                    </div>
                </div>

                <h2 className="group-text">Location</h2>
                <div className="flex-horizontal">
                    <div className="property-group">
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
                    <div className="property-group">
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
                    <div className="property-group">
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
                </div>

                <div className="property-group" id="description-input">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={(e) => setForm({...form, description:e.target.value})}
                        required
                    />
                </div>
                {errors && <p className="error-text">{errors}</p>}
                <div className="flex-horizontal">
                    <Link to='/user' id="cancel-button">Cancel</Link>
                    <button type="submit" id="submit-button">Save</button>
                </div>
            </form>
        </div>
    );
}

export default Property_Create;