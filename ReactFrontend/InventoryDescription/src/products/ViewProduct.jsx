import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link , useParams} from 'react-router-dom'

export const ViewProduct = () => {

    const [product, setProduct] = useState({
        productName: "",
        productCost: 0,
        productNoOfBreakdowns:0
    })

    const {product_id} = useParams();

    useEffect(()=>{
        loadProduct()

    }, [])

    const loadProduct = async() =>{
        const result = await axios.get(`http://localhost:8080/fetchProduct/${product_id}`)
        setProduct(result.data)
    }

  return (
      <div className='container'>
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
        </div>
  )
}
