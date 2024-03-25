import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorDisplay from '../pages/ErrorDisplay';

export default function AddProduct() {

  let navigate = useNavigate();

  const[product, setProduct]=useState({
    productName:"",
    productCost:0,
    productNoOfBreakdowns:0
  })

  const [error, setError] = useState(null);

  const{productName, productCost, productNoOfBreakdowns} = product

    const onInputChange = (e) => {
        const { name, value } = e.target;


        const newValue = name === 'productCost' || name === 'productNoOfBreakdowns' ? parseInt(value, 10) || '' : value;

        setProduct({
            ...product,
            [name]: newValue,
        });
    };

  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/insertProduct", product);
      navigate("/");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError({
          title: "Error",
          status: error.response.status,
          detail: error.response.data.detail || "An unexpected error occurred.",
        });
      } else if (error.request) {
        // The request was made but no response was received
        setError({
          title: "Network Error",
          status: "Network Error",
          detail: "No response was received.",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        setError({
          title: "Error",
          status: "Error",
          detail: error.message,
        });
      }
    }
  }

  return (
    <div className='container'>
      {error ? (<ErrorDisplay errorDetails={error}/>)
      : (

      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Product to DB</h2>

          <form onSubmit={(e)=> onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='Name' className='form-label'>
              Product Name
            </label>
            <input type="text"
            className = "form-control"
            placeholder='Enter product name'
            name = "productName"
            value={productName}
            onChange={(e)=>onInputChange(e)}
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
  );
}
