import React, {Component} from 'react';
import {Button, Table} from "react-bootstrap";
import firebase from "../firebase";
import moment from "moment";
import Model from "./Model";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
const db = firebase.ref().child('Orders');
const db1 = firebase.ref().child('suppliers');
const db2 = firebase.ref().child('payment');
class Payment extends Component {

    constructor() {
        super();
        this.state = {
            orderList : [],
            suppliers:[],
            modal:false,
            obj : [],
            orderid:'',
            tot:'',
            paid:[]


        }
    }

    componentDidMount() {

        db2.on('value', snapshot => {
            let paid = [];
            snapshot.forEach(snap => {
                paid.push(snap.val().orderid);
            });
            this.setState({paid: paid},() =>console.log(this.state.paid));

        })

        db.on('value', snapshot => {
            let allOrders = [];
            snapshot.forEach(snap => {
                if(snap.val().status === 'Placed' && !this.state.paid.includes(snap.val().ID))
                    allOrders.push(snap.val());
            });
            this.setState({orderList: allOrders},() =>console.log(this.state.orderList));

        })

        db1.on("value", (items) => {
            items.forEach((item) => {
                let obj = item.val()
                obj.id = item.key
                this.state.suppliers.push(obj);
                this.setState({
                    suppliers: this.state.suppliers
                },(() => console.log(this.state.suppliers)));
            });
        });
    }

    getTotalCost = (item,supplier) => {
        let tot = 0;
        item.map(val => {
            let unit = 0
            this.state.suppliers.map(val => {
                if(val.sname === supplier){
                    val.itemList.map(i => {
                        if(i.item ===  val.item) {
                            if (i.unit === undefined) {
                                unit = 0
                            }
                            else {
                                unit = parseFloat(i.unit)
                            }
                        }
                    })
                }
            })

            tot = tot + ( parseFloat(val.quantity) * unit)
        })
        return tot
    }

    getUnitBySup = (sup,item) => {

      this.state.suppliers.map(val => {
            if(val.sname === sup){
                val.itemList.map(i => {
                    if(i.item ===  item) {
                        if (i.unit === undefined) {
                           return 0
                        }
                        else {
                            return i.unit
                        }
                    }
                })
            }
        })

    }


    getTot = (oid,sid) => {
        let price = 0
        let index = this.state.orderList.findIndex(x => x.ID ===oid)
        let index1 = this.state.suppliers.findIndex(x => x.sname ===sid)
        this.state.orderList[index].item.map(i => {
            this.state.suppliers[index1].itemList.map(l => {
                if(l.item === i.item){
                    price = price + (i.quantity * l.unit)
                }
            })
        })
        return price
    }

    closePopup = () => {
        this.setState({modal: false})
    }

    setSupplier = (sname) => {
        this.state.suppliers.map(val => {
            if(val.sname === sname)
                this.setState({obj:val})
        })
    }

    render() {
        if(this.state.orderList.length ===  0)
            return (
                <h1 className='text-center'>No Items to Pay</h1>
            )
        if(this.state.suppliers.length ===  0)
            return (
                <Loader
                    type="Oval" color="#00BFFF" height={80} width={80}
                    timeout={5000} //5 secs
                />
            )
        return (
            <div style={{height:'80%', width:'70%', marginTop:'5%', marginLeft:'20%', backgroundColor:'#f1f1f1'}}>
                <div style={{backgroundColor:'#3fb1c6', border: '2px solid black'}}>
                    <p style={{marginLeft:'40%', color: 'white', fontSize:'20px', marginTop:'3%'}}>Delivered Orders</p>
                </div>
                <div style={{ border: '2px solid black'}}>
                <Table striped bordered hover  >
                    <thead style={{backgroundColor:"#3fb1c6",color:'white'}} className="font-weight-bold">
                    <tr>
                        <th>Order ID</th>
                        <th>Supplier</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orderList.map((orders,i) => {
                        return <tr key={i}>
                            <td>{orders.ID}</td>
                            <td>{orders.supplierID}</td>
                            <td>{
                                orders.item.map(items=>{
                                    return <div>{items.item} - {items.quantity}</div>
                                })
                            }</td>
                            <td>{ moment((orders.date)).format('L')}</td>
                            <td>{orders.status}</td>
                            <td>{this.getTot(orders.ID,orders.supplierID)}</td>
                            <td>

                                    <Button variant="outline-primary" className="pl-3 pr-3" onClick={() => {
                                        this.setSupplier(orders.supplierID)
                                        this.setState({orderid:orders.ID,tot :this.getTot(orders.ID,orders.supplierID),modal:true})}}>Make Payment</Button>

                            </td>
                        </tr>

                    })}
                    </tbody>
                </Table>


                <Model modal={this.state.modal} orderid={this.state.orderid} tot={this.state.tot}  close={this.closePopup} obj={this.state.obj} />

                </div>
            </div>
        )
    }
}

export default Payment;
