import React, {Component} from 'react';
import {Button, Table} from "react-bootstrap";
import firebase from "../firebase";
import moment from "moment";
import Model from "./Model";
const db = firebase.ref().child('Orders');
const db1 = firebase.ref().child('suppliers');
class Payment extends Component {

    constructor() {
        super();
        this.state = {
            orderList : [],
            suppliers:[],
            modal:false,
            obj : []

        }
    }

    componentDidMount() {
        db.on('value', snapshot => {
            let allOrders = [];
            snapshot.forEach(snap => {
                console.log(snap.key);
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
            return null
        if(this.state.suppliers.length ===  0)
            return null
        return (
            <div className="mt-5 mr-5" style={{marginLeft:'20%'}}>
                <Table striped bordered hover  >
                    <thead style={{backgroundColor:"#3fb1c6",color:'white'}} className="font-weight-bold">
                    <tr>
                        <th>Order ID</th>
                        <th>Supplier</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total Cost</th>
                        <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orderList.map((orders,i) => {
                        return <tr key={i}>
                            <td>{orders.ID}</td>
                            <td>{orders.supplierID}</td>
                            <td>{orders.description}</td>
                            <td>{ moment((orders.date)).format('L')}</td>
                            <td>{orders.status}</td>
                            <td>{setTimeout(() =>this.getTotalCost(orders.item,orders.supplierID),1000)}</td>
                            <td>

                                    <Button variant="outline-primary" className="pl-3 pr-3" onClick={() => {
                                        this.setSupplier(orders.supplierID)
                                        this.setState({modal:true})}}>Make Payment</Button>

                            </td>
                        </tr>

                    })}
                    </tbody>
                </Table>


                <Model modal={this.state.modal}  close={this.closePopup} obj={this.state.obj}/>
                {/*<Modal isOpen={this.state.modal} >*/}
                {/*    <ModalHeader >Make Payment</ModalHeader>*/}
                {/*    <ModalBody>*/}
                {/*        <p> Supplier Name :  <strong>Kala</strong></p>*/}
                {/*        <p> Account Number :  <strong>Kala</strong></p>*/}
                {/*        <p> Branch :  <strong>Kala</strong></p>*/}
                {/*        <p> Total Cost :  <strong>Kala</strong></p>*/}


                {/*        <FormGroup>*/}
                {/*            <Label for="exampleText">Text Area</Label>*/}
                {/*            <Input type="textarea" name="text" id="exampleText" />*/}
                {/*        </FormGroup>*/}
                {/*    </ModalBody>*/}
                {/*    <ModalFooter>*/}
                {/*        <Button color="primary" onChange={(e) => this.setState({creditNote:e.target.value})}>Make Payment</Button>{' '}*/}
                {/*        <Button color="secondary" onClick={() => {this.setState({modal:false})}} >Cancel</Button>*/}
                {/*    </ModalFooter>*/}
                {/*</Modal>*/}

            </div>
        )
    }
}

export default Payment;
