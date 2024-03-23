import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddProduct() {

  let navigate = useNavigate();

  const[product, setProduct]=useState({
    productName:"",
    productCost:0,
    productNoOfBreakdowns:0
  })

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
    await axios.post("http://localhost:8080/insertProduct", product);
    navigate("/");
  }

  return (
    <div className='container'>
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
    </div>
  )
}
