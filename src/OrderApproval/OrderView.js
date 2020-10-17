import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
import {Link} from "react-router-dom";
import './orders.css'
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


    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }


    render() {
        return(
            <div className="mt-5 mr-5" style={{marginLeft:'20%'}}>
                <Table striped bordered hover  style={{borderWidth:2}} >
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
                            <td>{orders.ID}</td>
                            <td>{orders.site}</td>
                            <td>{
                                orders.item.map(items=>{
                                    return <div>{items.item} - {items.quantity}</div>
                                })
                            }</td>
                            <td>{this.convert(orders.date)}</td>
                            <td>{orders.status}</td>
                            <td align="center">
                                <Link className="edit-link" to={"/approve-order/" + orders.ID}>
                                    <Button  className="pl-3 pr-3 button-t">View Order</Button>
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
