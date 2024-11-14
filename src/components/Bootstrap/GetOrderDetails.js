import React, { useState } from 'react'
import ordersApi from '../api/orders.js'
import '../stylesheet.css'

const GetOrderDetails = (props) => {
  const [Number, setNumber] = useState('');
  const [Bool, setBool] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [valid, setValid] = useState({isTrue:false,error:''})
  let submit;
  window.orderNo=parseInt(Number);

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
      // console.log('Checking Order number in Validate'); 
      submit='no'}
    else {setValid({isTrue:true,error:''}); 
      // console.log('All fields are good in validate'); 
      submit='yes'}
  }
  async function handleSubmit(event) {
    event.preventDefault();
    Validate();
    if (submit==='yes'){
      setLoading(true);
      const json = await ordersApi.getOrder(window.orderNo);
      console.log("Response for fetching Order Details with order id:"+ Number +" --> "+ JSON.stringify(json));
      statusBool(json);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <h4 align='center' style={{marginTop:'50px'}}>Order Details</h4>
        <p align='center' className='instructions'>{props.instruction}</p>
      </div>
      <div className='container'>
        <table className='new-order'>
          <tbody>
            <tr>
              <td>Order Number*</td>
              <td><input className='user-info' type='number' name='OrderNumber' 
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
        <p className='after-submit'>Order details of Order #{Bool.orderId}:</p>
        <table className='table table-bordered'>
          <thead>
            <tr>
            <th>Order Number</th>
              <th>Customer Number</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Zip Code</th>
              <th>Place</th>
            </tr>
            <tr>
              <td>{Bool.orderId}</td>
              <td>{Bool.customerId}</td>
              <td>{Bool.customerName}</td>
              <td>{Bool.address}</td>
              <td>{Bool.pinCode}</td>
              <td>{Bool.createdAt}</td>
            </tr>
          </thead>
        </table>
      </div>
      ):((Loading)?<div align="center"><p className='after-submit'>Fetching details</p></div>:'')
      }
    </form>
  )
}

export default GetOrderDetails
