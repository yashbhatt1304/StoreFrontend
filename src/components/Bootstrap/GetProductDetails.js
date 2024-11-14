import React, { useState } from 'react'
import productsApi from '../api/products.js'
import '../stylesheet.css'

const GetProductDetails = (props) => {
  const [Number, setNumber] = useState('');
  const [Bool, setBool] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [valid, setValid] = useState({isTrue:false,error:''})
  let submit;
  window.productNo=parseInt(Number);

  const handleNumber = (event) => {
    event.preventDefault();
    setLoading(false);
    setNumber(event.target.value);
    setBool(null);
  }
  const statusBool = (Data) => {
    setBool(Data);
  }
  async function Validate() {
    if (Number>9999){
      setValid({isTrue:false,error:'Order number can not be more than 4 digits'}); 
    //   console.log('Checking Order number in Validate'); 
      submit='no'}
    else {setValid({isTrue:true,error:''}); 
    //   console.log('All fields are good in validate'); 
      submit='yes'}
  }
  async function handleSubmit(event) {
    event.preventDefault();
    Validate();
    if (submit==='yes'){
      setLoading(true);
      const json = await productsApi.getProduct(window.productNo);
      console.log("Response for fetching Product Details with product id:"+ Number +" --> "+ JSON.stringify(json));
      statusBool(json);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <h4 align='center' style={{marginTop:'50px'}}>Product Details</h4>
        <p align='center' className='instructions'>{props.instruction}</p>
      </div>
      <div className='container'>
        <table className='new-order'>
          <tbody>
            <tr>
              <td>Product Number*</td>
              <td><input className='user-info' type='number' name='ProductNumber' 
              value={Number} onChange={handleNumber} required/></td>
            </tr>
          </tbody>
        </table>
      </div>
      {(valid.isTrue)?<p className='error'></p>:<p className='error' align='center'>{valid.error}</p>}
      <div align='center'>
        <button className='submit' type='submit'>Submit</button>
      </div>
      {(Bool)?(
        <div className='container-fluid' align='center'>
        <p className='after-submit'>Product details of Product #{Bool.id}:</p>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product</th>
              <th>Department</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>{Bool.id}</td>
              <td>{Bool.product}</td>
              <td>{Bool.department}</td>
              <td>{Bool.price}</td>
            </tr>
          </thead>
        </table>
      </div>
      ):((Loading)?<div align="center"><p className='after-submit'>Fetching details</p></div>:'')
      }
    </form>
  )
}

export default GetProductDetails
