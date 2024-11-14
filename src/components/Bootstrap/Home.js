import React from 'react'
import { Link } from 'react-router-dom'
import '../stylesheet.css'

const Home = () => {
  return (
    <div>
        <h6>Hi User! Choose the right option from below list.</h6>
        <div className="card home">
            <ul className="list-group list-group-flush">
                <li className="list-group-item home-list">
                    <Link className="nav-details" to="/createorder">
                        <p style={{margin:'auto'}}>Create New Order</p>
                    </Link>
                </li>
                <li className="list-group-item home-list">
                    <Link className="nav-details" to="/getorderdetails">
                        <p style={{margin:'auto'}}>Get Order Details</p>
                    </Link>
                </li>
                <li className="list-group-item home-list">
                    <Link className="nav-details" to="/addproduct">
                        <p style={{margin:'auto'}}>Add New Product</p>
                    </Link>
                </li>
                <li className="list-group-item home-list">
                    <Link className="nav-details" to="/getproductdetails">
                        <p style={{margin:'auto'}}>Get Product Details</p>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Home
