import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ErrorDisplay from '../pages/ErrorDisplay';

export default function EditProduct() {

    let navigate = useNavigate();

    const {product_id} = useParams()

    const [product, setProduct] = useState({
        productName: "",
        productCost: 0,
        productNoOfBreakdowns: 0
    })

    const [error, setError] = useState(null);

    const { productName, productCost, productNoOfBreakdowns } = product

    const onInputChange = (e) => {
        const { name, value } = e.target;
      
        // Handle numeric inputs
        const newValue = name === 'productCost' || name === 'productNoOfBreakdowns' ? parseInt(value, 10) || '' : value;
      
        setProduct({
          ...product,
          [name]: newValue,
        });
      };

    useEffect(()=> {
        loadProduct();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/updateProduct/${product_id}`, product);
            navigate("/");
        } catch (error) {
            setError(handleError(error));
        }
    };

    const handleError = (error) => {
        if (error.response) {
            return {
                title: "Error",
                status: error.response.status,
                detail: error.response.data.detail || "An unexpected error occurred.",
            };
        } else if (error.request) {
            return {
                title: "Network Error",
                status: "Network Error",
                detail: "No response was received.",
            };
        } else {
            return {
                title: "Error",
                status: "Error",
                detail: error.message,
            };
        }
    };

    const loadProduct = async() => {
        try {
            const result = await axios.get(`http://localhost:8080/fetchProduct/${product_id}`)
            setProduct(result.data)
        } catch (error) {
            setError(handleError(error));
        }
    };

    return (
        <div className='container'>
            {error ? (
                <ErrorDisplay errorDetails={error}/>
            ) : (
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Product from DB</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Product Name
                            </label>
                            <input type="text"
                                className="form-control"
                                placeholder='Enter product name'
                                name="productName"
                                value={productName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Cost' className='form-label'>
                                Product Cost
                            </label>
                            <input type="text"
                                className="form-control"
                                placeholder='Enter product cost'
                                name="productCost"
                                value={productCost}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='nBreaks' className='form-label'>
                                No of breakdowns
                            </label>
                            <input type="text"
                                className="form-control"
                                placeholder='Enter no of product breakdowns'
                                name="productNoOfBreakdowns"
                                value={productNoOfBreakdowns}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link to={"/"} className='btn btn-danger mx-2'>Cancel</Link>
                    </form>
                </div>
            </div>
            )}
        </div>
    )
}
