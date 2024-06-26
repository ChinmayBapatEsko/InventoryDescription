import React from 'react'
import axios from "axios"

import { useState } from 'react'
import {Link, useParams} from "react-router-dom"
import ErrorDisplay from './ErrorDisplay'

export default function Home() {

    const [products, setProduct]= React.useState([])

    const [error, setError] = useState(null);
    const {product_id} =useParams()

    //useEffect used to do a task that needs to be done each time the page is loaded
    React.useEffect(() => {
      loadProducts();
    },[]); //empty array means that it will run only once, if array not present, function insode useEffect will run infinitely

    const loadProducts = async () => {
        try {
            const result = await axios.get("http://localhost:8080/fetchProducts");
            setProduct(result.data);
        } catch (error) {
            setError(handleError(error)); // Handle error
        }
    };

    const deleteProduct = async (product_id) => {
        try {
            await axios.delete(`http://localhost:8080/deleteProduct/${product_id}`);
            loadProducts();
        } catch (error) {
            setError(handleError(error)); // Handle error
        }
    };
    
    const handleError = (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return {
                status: error.response.status,
                detail: error.response.data.message || "An error occurred.",
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
    <div className="container">
        {error ? <ErrorDisplay errorDetails={error}/> : (
        <div className="py-4">

              <table className="table border shadow">
                  <thead>
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Product Cost</th>
                          <th scope="col">No of Breaks</th>
                          <th scope="col">Action</th>
                      </tr>
                  </thead>
                  <tbody>

                    {
                        products.map((product, index) => (
                        <tr>
                            <th scope="row" key = {index}>{index+1}</th>
                            <td>{product.productName}</td>
                            <td>{product.productCost}</td>
                            <td>{product.productNoOfBreakdowns}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewProduct/${product.product_id}`} >View</Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/updateProduct/${product.product_id}`}> Edit </Link>
                                <button onClick={()=> deleteProduct(product.product_id)} className="btn btn-danger mx-2">Delete</button>
                            </td>
                        </tr>
                        ))
                    }

                  </tbody>
              </table>
        </div>
        )}
    </div>
  )
}
