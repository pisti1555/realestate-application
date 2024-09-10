import React from "react";
import { useState, useEffect, FormEvent} from "react";
import api from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProperty } from "../../services/property";
import { PropertyInterface_Store } from "../../interface/property/PropertyInterface";
import ErrorPage from "../../components/pages/error/Error";
import Loading from "../../components/pages/loading/Loading";

import page_style from '../../css/property/property_agent/PropertyCreatePage.module.css';
import form_style from '../../css/property/property_agent/PropertyForm.module.css';

const PropertyEdit = () => {
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

    const [prevImage, setPrevImage] = useState<string | null>(null);
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
            setErrors(error.message);
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
                    setPrevImage(data.image);
                }
            }
        ).catch((error) => {
            setErrors(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        if (success) {
            navigate('/properties/' + id);
        }
    }, [id, success, navigate]);

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
        <div className={page_style.property_container}>
            <h1>Create a new property</h1>
            <form onSubmit={handleSubmit} className={form_style.property_form}>
                <h2 className={form_style.group_text}>Upload an Image</h2>
                <div className={form_style.image_input}>
                    {form.image ? (
                        <label className={form_style.image_upload_label}>
                            <div className={form_style.image_container}>
                                <img src={URL.createObjectURL(form.image)} alt="Upload" />
                                <p>{form.image.name}</p>
                                <span className={form_style.browse_button}>Choose another image</span>
                            </div>
                            <input 
                                id="image" 
                                type="file" 
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </label>
                    ) : (
                        <label className={form_style.image_upload_label}>
                            <div className={form_style.image_upload_design}>
                                <div className={form_style.image_container}>
                                    {prevImage ? (
                                        <img src={prevImage} alt="Upload" />
                                    ) : (
                                        <svg viewBox="0 0 640 512" height="1em">
                                            <path
                                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                            ></path>
                                        </svg>
                                    )}
                                </div>
                                <span className={form_style.browse_button}>Choose an image</span>
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
                
                <h2 className={form_style.group_text}>Main data</h2>
                <div className={form_style.flex_horizontal}>
                    <div className={form_style.property_group}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={(e) => setForm({...form, title: e.target.value})}
                            required
                        />
                    </div>
                    <div className={form_style.property_group}>
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

                <h2 className={form_style.group_text}>Location</h2>
                <div className={form_style.flex_horizontal}>
                    <div className={form_style.property_group}>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={form.city}
                            onChange={(e) => setForm({...form, city: e.target.value})}
                            required
                        />
                    </div>
                    <div className={form_style.property_group}>
                        <label htmlFor="postal_code">Postal code</label>
                        <input
                            type="text"
                            id="postal_code"
                            name="postal_code"
                            value={form.postal_code}
                            onChange={(e) => setForm({...form, postal_code: e.target.value})}
                            required
                        />
                    </div>
                    <div className={form_style.property_group}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={(e) => setForm({...form, address: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <div className={form_style.property_group} id={form_style.description_input}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        required
                    />
                </div>
                {errors && <p className={form_style.error_text}>{errors}</p>}
                <div className={form_style.flex_horizontal}>
                    <Link to='/user' className={form_style.cancel_button}>Cancel</Link>
                    <button type="submit" className={form_style.submit_button}>Update</button>
                </div>
            </form>
        </div>
    );
}

export default PropertyEdit;