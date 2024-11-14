import React, { Component } from 'react'
import Header from './Bootstrap/Header';
import { Routes,Route } from 'react-router-dom';
import CreateOrder from './Bootstrap/CreateOrder';
import GetOrderDetails from './Bootstrap/GetOrderDetails';
import AddProduct from './Bootstrap/AddProduct';
import GetProductDetails from './Bootstrap/GetProductDetails';
import Home from './Bootstrap/Home';
import About from './Bootstrap/About';
import Contact from './Bootstrap/Contact';
import Footer from './Bootstrap/Footer';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header></Header>
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/createorder" 
                element={<CreateOrder instruction="Fields marked with * are required"/>}/>
        <Route exact path="/getorderdetails" 
                element={<GetOrderDetails instruction="Fields marked with * are required" />}/>
        <Route exact path="/addproduct" 
                element={<AddProduct instruction="Fields marked with * are required"/>}/>
        <Route exact path="/getproductdetails" 
                element={<GetProductDetails instruction="Fields marked with * are required" />}/>
        <Route exact path="/about" element={<About />}/>
        <Route exact path="/contact" element={<Contact />}/>
        </Routes>
        <Footer/>
      </div>
    )
  }
}

export default App;