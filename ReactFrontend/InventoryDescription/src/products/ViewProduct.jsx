import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link , useParams} from 'react-router-dom'
import ErrorDisplay from '../pages/ErrorDisplay'

export const ViewProduct = () => {

    const [product, setProduct] = useState({
        productName: "",
        productCost: 0,
        productNoOfBreakdowns:0
    })

    const [error, setError] = useState(null);
    const {product_id} = useParams();

    useEffect(()=>{
        loadProduct()

    }, [])

    const loadProduct = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/fetchProduct/${product_id}`);
            setProduct(result.data);
        } catch (error) {
            setError(handleError(error));
        }
    };

    const handleError = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return {
                status: error.response.status,
                detail: error.response.data.message || "An error occurred while fetching the product.",
            };
        } else if (error.request) {
            // The request was made but no response was received
            return {
                status: "Network Error",
                detail: "No response was received",
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return {
                status: "Error",
                detail: error.message,
            };
        }
    };

  return (
      <div className='container'>
        {error ? (<ErrorDisplay errorDetails={error}/>) : (
          <div className='row'>
              <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                  <h2 className='text-center m-4'>View Product Details</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Product Id: {product.product_id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b> Product Name: </b>
                                    {product.productName}
                                </li>
                              <li className='list-group-item'>
                                  <b> Product Cost: </b>
                                  {product.productCost}
                              </li>
                              <li className='list-group-item'>
                                  <b> No of Breakdowns: </b>
                                  {product.productNoOfBreakdowns}
                              </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-outline-primary my-2' to={"/"}>Home</Link>
                </div>
            </div>
        )}
        </div>
  )
}
