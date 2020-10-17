import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import firebase from "../firebase";
import {Button} from 'react-bootstrap'
const db = firebase.ref();

export default class ApproveOrder extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Order:[],
            Items:[],
            orderItems:[],
            SItems:[],
            budgetLimit:0,
            totPrice:0,
            unitPriceInvalid:false
        }
    }


    componentDidMount(){
        console.log(this.props.match.params.id + 'HDDGDG');

        db.child('Orders/'+this.props.match.params.id).on('value', snapshot => {
            let ot =[]
            if (snapshot.exists()) {
                ot = snapshot.val().item
                this.setState({
                    Order:snapshot.val(),
                    Items:snapshot.val().item,
                    orderItems:ot
                })
                snapshot.val().item.map(ii=>{
                    console.log("hghghghghhhhhhhhhhh((((" + ii.item)
                })

                console.log("this is item "+ this.state.Items)
            }


        })

        db.child('suppliers').on('value', snapshot => {
            let selectSuppliers = [];
            snapshot.forEach(snap => {
                if(snap.val().sname == this.state.Order.supplierID){
                    //  selectSuppliers.push(snap.val().itemList);
                    selectSuppliers = snap.val().itemList
                }
            });

        })

        db.child('budget').on('value', snapshot => {
            snapshot.forEach(snap => {
                if(snap.val().site == this.state.Order.site)
                    this.setState({budgetLimit: snap.val().budget});

                console.log("budget limit is" + this.state.budgetLimit)
            });


        })

        let price =0;

        this.state.Items.map(rr => {
            this.state.SItems.map(ss=>{
                if(rr.item == ss.item){
                    console.log(rr.item + " filter wenne meka ")
                    if(ss.unit == undefined){
                        console.log("cannot to undefined")
                        this.setState({
                            unitPriceInvalid:true
                        })
                    }else{
                        price = price + (rr.quantity * ss.unit)

                    }

                }
            })


        });

        this.setState({totPrice:price})
        console.log(" filter wechi eke price eka " + this.state.totPrice)




    }


    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-")
    }


    approveOrder(){

        if(this.state.totPrice < this.state.budgetLimit && this.state.unitPriceInvalid == false){
            db.child(`Orders`).child(this.props.match.params.id).update({
                status:'Approved'
            },err => {
                if (err)
                    console.log(err)
                else
                    console.log("Successful status updated !!!");
            })

        }else{
            console.log("budget limit not exceed")

        }
    }

    declinedOrder(){
        db.child(`Orders`).child(this.props.match.params.id).update({
            status:'Declined'
        },err => {
            if (err)
                console.log(err)
            else
                console.log("Successful status updated to declined!!!");
        })
    }

    render() {

        return(
            <div style={{height:'70%', width:'50%', marginTop:'5%', marginLeft:'30%', backgroundColor:'white'}}>

                <div style={{backgroundColor:'#3fb1c6', border: '2px solid black'}}>
                    <p style={{marginLeft:'40%', color: 'white', fontSize:'20px', marginTop:'3%'}}  onClick={()=>{window.location.reload()}}>
                        PENDING APPROVAL
                    </p>
                </div>
                <div style={{ border: '2px solid black'}}>
                    <div style={{height:'40%',width:'70%',marginLeft:'15%',marginRight:'15%'}} className="mt-3 mb-3">
                        <Table responsive="md" className="react-bs-table">
                            <tbody>
                            <tr >
                                <td style={{paddingRight:'5%'}}>Order ID</td>
                                <td ><div style={{backgroundColor:'#cbd3cd',padding:'1%',width:'100%'}}>{this.state.Order.ID}</div></td>
                            </tr>
                            <tr>
                                <td style={{paddingRight:'5%'}}>Site Name</td>
                                <td><div style={{backgroundColor:'#cbd3cd',padding:'1%',width:'100%'}}>{this.state.Order.site}</div></td>
                            </tr>
                            <tr>
                                <td style={{paddingRight:'5%'}}>Supplier Name</td>
                                <td><div style={{backgroundColor:'#cbd3cd',padding:'1%',width:'100%'}}>{this.state.Order.supplierID}</div></td>
                            </tr>
                            <tr>
                                <td style={{paddingRight:'5%'}}>Date</td>
                                <td><div style={{backgroundColor:'#cbd3cd',padding:'1%',width:'100%'}}>{this.convert(this.state.Order.date)}</div>

                                </td>
                            </tr>
                            <tr><td style={{paddingRight:'1%'}} />
                                <td ><div style={{borderTop: '0.8px solid black'}}>
                                    <h6 style={{marginTop:'4%'}}>List</h6>
                                    <Table responsive="md">
                                        <tbody>
                                        <tr>
                                            {Object.keys(this.state.Items).map((key, index) => {
                                                return <td key={index} style={{fontSize:'16px'}}> <li>{this.state.Items[key].item}    Qty{this.state.Items[key].quantity}</li> </td>

                                            })
                                            }
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div></td>
                            </tr>
                            <tr><td style={{paddingRight:'5%'}} />
                                <div className="row">
                                    <div className="col-6" align="center">
                                        <Button variant="danger" onClick={()=>{this.approveOrder()}}>Approve</Button>
                                    </div>
                                    <div className="col-6" align="center">
                                        <Button variant="primary"  onClick={()=>{this.declinedOrder()}}>Decline</Button>
                                    </div>
                                </div>
                            </tr>

                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        );
    }
}
