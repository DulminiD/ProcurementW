import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
import {Link} from "react-router-dom";
const db = firebase.ref().child('Orders');

export default class OrderView extends Component{
    constructor(props) {
        super(props);
        this.state={
            orderList:[]
        };
    }

    componentDidMount() {
        db.on('value', snapshot => {
            let allOrders = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
                allOrders.push(snap.val());
            });
            this.setState({orderList: allOrders});
            console.log(this.state.orderList)
        })
    }

   displayTable(){

   }

    render() {
        return(
            <div className="mt-5 mr-5" style={{marginLeft:'20%'}}>
              <Table striped bordered hover  >
                <thead style={{backgroundColor:"#3fb1c6",color:'white'}} className="font-weight-bold">
                   <tr>
                     <th>Order ID</th>
                     <th>CompanyID</th>
                     <th>Details</th>
                     <th>Date</th>
                     <th>Status</th>
                     <th>View</th>
                     </tr>
                </thead>
                <tbody>
                {this.state.orderList.map(orders=>{
                    return <tr>
                    <td>{orders.orderId}</td>
                    <td>{orders.companyID}</td>
                    <td>{orders.item} - {orders.quantity}</td>
                    <td>{orders.date}</td>
                    <td>{orders.status}</td>
                    <td>
                        <Link className="edit-link" to={"/approve-order/" + orders.orderId}>
                        <Button variant="outline-primary" className="pl-3 pr-3">View Order</Button>
                        </Link>
                    </td>
                    </tr>

                })}
                 </tbody>
               </Table>
            </div>
        );
    }
}
