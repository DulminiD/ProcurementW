import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import LimitService from "./Management/Service/limitService";
import ItemService from "./Management/Service/itemService";
import BudgetService from "./Management/Service/budgetService";
import Home from "./Home/home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import AddSuppliers from "./Suppliers/AddSuppliers";
import ViewSuppliers from "./Suppliers/ViewSuppliers";
import EditSuppliers from "./Suppliers/EditSuppliers";
import Payment from "./Payment/Payment";
import ViewOrderService from "./OrderApproval/Service/viewOrderService";
import ApproveOrderService from "./OrderApproval/Service/approveOrderService";

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
                    <Route path="/limit" exact component={LimitService}/>
                    <Route path="/budget" exact component={BudgetService}/>
                    <Route path="/item" exact component={ItemService}/>
                    <Route path="/view-order-status" exact component={ViewOrderService}/>
                    <Route path="/approve-order/:id" exact component={ApproveOrderService}/>
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
