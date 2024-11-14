import React, { useState } from 'react'
import productsApi from '../api/products.js'
import '../stylesheet.css'

const AddProduct = (props) => {
  const [Id, setId]=useState('')
  const [PName, setPName]=useState('')
  const [Department, setDepartment]=useState('')
  const [Price, setPrice]=useState('')
  const [Bool, setBool] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [valid, setValid] = useState({isTrue:false,error:''})
  let submit;
  window.product= {
    createdAt: '',
    id: Id,
    product: PName,
    department: Department,
    price: Price
   }

  const handleId = (event) => {
    event.preventDefault();
    setLoading(false);
    setBool(null);
    setId(event.target.value);
  }
  const handlePName = (event) => {
    event.preventDefault();
    setLoading(false);
    setBool(null);
    setPName(event.target.value);
  }
  const handleDepartment = (event) => {
    event.preventDefault();
    setLoading(false);
    setBool(null);
    setDepartment(event.target.value);
  }
  const handlePrice = (event) => {
    event.preventDefault();
    setLoading(false);
    setBool(null);
    setPrice(event.target.value);
  }
  async function Validate() {
    if (Id>9999){
      setValid({isTrue:false,error:'Id can not be more than 4 digits'}); 
      // console.log('Checking Customer Id in Validate'); 
      submit='no'}
    else if (isNaN(Price)) {
      setValid({isTrue:false,error:'Price should be numerical value'}); 
      // console.log('Checking Price in Validate'); 
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
      const json = await productsApi.postProduct(window.product);
      console.log("Response for creating new product --> "+ JSON.stringify(json));
      setBool(json);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <h4 align='center' style={{marginTop:'50px'}}>New Product</h4>
        <p align='center' className='instructions'>{props.instruction}</p>
      </div>
      <div className='container'>
        <table className='new-order'>
          <tbody>
            <tr>
              <td>Product Id*</td>
              <td><input className='user-info' type='number' value={Id} onChange={handleId} 
              placeholder='1234' required/></td>
            </tr>
            <tr>
              <td>Product Name*</td>
              <td><input className='user-info' type='text' value={PName} onChange={handlePName}
              placeholder='Bat' required/></td>
            </tr>
            <tr>
              <td>Department Name*</td>
              <td><input className='user-info' type='text' value={Department} onChange={handleDepartment}
              placeholder='Sports' required/></td>
            </tr>
            <tr>
              <td>Price*</td>
              <td><input className='user-info' type='text' value={Price} onChange={handlePrice}
              placeholder='300'/></td>
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
        <p className='after-submit'>Product with below details is created</p>
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
      </div>):
      ((Loading)?(<div align="center"><p className='after-submit'>Uploading details</p></div>):'')}
    </form>
  )
}

export default AddProduct
