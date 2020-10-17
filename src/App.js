import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import Limit from "./Management/limit";
import Item from "./Management/item";
import Budget from "./Management/budget";
import Home from "./Home/home";
import OrderView from "./OrderApproval/OrderView";
import ApproveOrder from "./OrderApproval/ApproveOrder";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import AddSuppliers from "./Suppliers/AddSuppliers";
import ViewSuppliers from "./Suppliers/ViewSuppliers";
import EditSuppliers from "./Suppliers/EditSuppliers";
import Payment from "./Payment/Payment";
import {Button} from "react-bootstrap";

class App extends React.Component {

    openNav() {
        document.getElementById("mySidenav").style.width = "230px";
        document.getElementById("main").style.marginLeft = "230px";
        document.body.style.backgroundColor = "rgba(0,0,0,0)";
    }

    componentDidMount() {
        this.openNav();
    }

    render() {
        return (
            <div style={{backgroundColor: '#f1f1f1', height: '100%', width: '100%'}}>

                <div id="main"/>

                <BrowserRouter>
                    <Navbar openNav={this.openNav} closeNav={this.closeNav}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/limit" exact component={Limit}/>
                    <Route path="/budget" exact component={Budget}/>
                    <Route path="/item" exact component={Item}/>
                    <Route path="/view-order-status" exact component={OrderView}/>
                    <Route path="/approve-order/:id" exact component={ApproveOrder}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/reg" exact component={Register}/>
                    <Route path='/addsupliers' exact component={AddSuppliers}/>
                    <Route path='/viewsupliers' exact component={ViewSuppliers}/>
                    <Route path='/editsupliers/:id' exact component={EditSuppliers}/>
                    <Route path='/payment' exact component={Payment}/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
