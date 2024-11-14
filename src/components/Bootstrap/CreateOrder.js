import React, { useState } from 'react'
import ordersApi from '../api/orders.js'
import '../stylesheet.css'

const CreateOrder = (props) => {
  const [Id, setId]=useState('')
  const [Name, setName]=useState('')
  const [Address, setAddress]=useState('')
  const [Bool, setBool] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [valid, setValid] = useState({isTrue:false,error:''})
  let submit;
  window.order= {
    createdAt: '',
    customerId: Id,
    customerName: Name,
    address: Address,
    pinCode: ''
   }

  const handleId = (event) => {
    event.preventDefault();
    setLoading(false);
    setBool(null);
    setId(event.target.value);
  }
  const handleName = (event) => {
    event.preventDefault();
    setLoading(false);
    setBool(null);
    setName(event.target.value);
  }
  const handleAddress = (event) => {
    event.preventDefault();
    setLoading(false);
    setBool(null);
    setAddress(event.target.value);
  }
  async function Validate() {
    if (Id>9999){
      setValid({isTrue:false,error:'Id can not be more than 4 digits'}); 
      // console.log('Checking Customer Id in Validate'); 
      submit='no'}
    else if(Name.length < 3){
      setValid({isTrue:false,error:'Name should be of atleast 3 & atmost 15 characters'}); 
      // console.log('Checking Customer Name in Validate'); 
      submit='no'}
      else if(Address.length < 10){
        setValid({isTrue:false,error:'Please provide detailed Address'}); 
        // console.log('Checking Address in Validate'); 
        submit='no'}
    else {setValid({isTrue:true,error:''}); 
      // console.log('All fields are good in validate'); 
      submit='yes'}
  }
  async function handleSubmit(event) {
    event.preventDefault();
    Validate();
    if (submit==='yes'){
      // console.log('inside click function, generating api call')
      setLoading(true);
      const json = await ordersApi.postOrder(window.order);
      console.log("Response for creating new order --> "+ JSON.stringify(json));
      setBool(json);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <h4 align='center' style={{marginTop:'50px'}}>New Order</h4>
        <p align='center' className='instructions'>{props.instruction}</p>
      </div>
      <div className='container'>
        <table className='new-order'>
          <tbody>
            <tr>
              <td>Customer Id*</td>
              <td><input className='user-info' type='number' value={Id} onChange={handleId} 
              placeholder='1234' required/></td>
            </tr>
            <tr>
              <td>Customer Name*</td>
              <td><input className='user-info' type='text' value={Name} onChange={handleName}
              placeholder='John Vinskey' required/></td>
            </tr>
            <tr>
              <td>Address*</td>
              <td><input className='user-info' type='text' value={Address} onChange={handleAddress}
              placeholder='3/110 Kings Street, Manchester'/></td>
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
        <p className='after-submit'>Order with below details is created</p>
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
      </div>):
      ((Loading)?(<div align="center"><p className='after-submit'>Uploading details</p></div>):'')}
    </form>
  )
}

export default CreateOrder
