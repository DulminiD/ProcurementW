import React, {Component} from 'react';
//import swal from "sweetalert";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Input, ListGroup, ListGroupItem} from "reactstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
import Supplier from "./Model/Supplier";
import swal from "sweetalert";

const db = firebase.ref("/suppliers");
const db1 = firebase.ref("/item");
let supplier = new Supplier()
class AddSuppliers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            toggleActive: false,
            sname: '',
            tel: '',
            email: '',
            address: '',
            accountNo: '',
            branch: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
    }


    componentDidMount() {
        const uname =  localStorage.getItem('userName')
        console.log(uname)
        if(uname === null){
            this.props.history.push("/login")
        }
        db1.on("value", (items) => {
            items.forEach((item) => {
                let obj = {
                    item :item.val().itemName,
                    unit : null
                }
                this.state.itemList.push(obj);
                this.setState({
                    itemList: this.state.itemList
                });
            });
        });
    }

    removeFromList = (index) => {
        console.log(index)
        let a = this.state.itemList
        a.splice(index, 1)
        this.setState({itemList: a})
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.itemList)
        supplier.supplierName = this.state.sname
        supplier.telephoneNo = this.state.tel
        supplier.email = this.state.email
        supplier.address = this.state.address
        supplier.accountNo = this.state.accountNo
        supplier.branch = this.state.branch
        supplier.itemList = this.state.itemList


        supplier.addSupplier()
        swal("Success!", "Successfully add new supplier", "success").then(() => this.props.history.push("/viewsupliers"))

    }

    setUnit = (key,val) => {
        let array = this.state.itemList
        array[key].item = this.state.itemList[key].item
        array[key].unit = val
        this.setState({itemList:array},() => console.log(this.state.itemList))

    }

    render() {
        return (
            <div className='mt-5 ml-5' style={{backgroundColor: '#eaefea'}}>
                <div className="container ">
                    <Row>
                        <Col>
                            <Card style={{backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto'}}>
                                <CardHeader style={{backgroundColor: '#3fb1c6'}}>
                                    <CardTitle tag="h3" style={{textAlign: 'center'}}>Add Supplier</CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <form onSubmit={this.onSubmit}>
                                        <Row className={'mt-3'}>
                                            <Col>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'} style={{color: 'black'}}>Supplier
                                                            Name</label>
                                                        <Input type="text" name="email" id="exampleEmail"
                                                               placeholder="User Name" onChange={(e) => {
                                                            this.setState({sname: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'}
                                                               style={{color: 'black'}}>Contact</label>
                                                        <Input type="number" name="contact" id="exampleEmail"
                                                               placeholder="Contact Number" onChange={(e) => {
                                                            this.setState({tel: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className={'mt-3'}>
                                            <Col>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'} style={{color: 'black'}}>Supplier
                                                            Address</label>
                                                        <Input type="text" name="address" id="exampleEmail"
                                                               placeholder="Address" onChange={(e) => {
                                                            this.setState({address: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'} style={{color: 'black'}}>Supplier
                                                            Email</label>
                                                        <Input type="email" name="email" id="exampleEmail"
                                                               placeholder="User Name" onChange={(e) => {
                                                            this.setState({email: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className={'mt-3'}>
                                            <Col>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'} style={{color: 'black'}}>Bank
                                                            Account No</label>
                                                        <Input type="number" name="accNo" id="exampleEmail"
                                                               placeholder="Bank Account Number" onChange={(e) => {
                                                            this.setState({accountNo: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'} style={{color: 'black'}}>Bank
                                                            Name & Branch</label>
                                                        <Input type="text" name="branch" id="exampleEmail"
                                                               placeholder="Bank Name & Branch" onChange={(e) => {
                                                            this.setState({branch: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className={'mt-3'}>
                                            <Col md={5} style={{marginRight: 'auto', marginLeft: 'auto'}}>

                                                <ListGroup>

                                                    {
                                                        this.state.itemList.map((val, key) => {
                                                            return <ListGroupItem className='d-inline-block' key={key}>
                                                                <p>{val.item}</p>
                                                                <Col md={6}>
                                                                    <div className="field">
                                                                        <div className="control">
                                                                            <label className={'font-weight-bold'}
                                                                                   style={{color: 'black'}}>Price per
                                                                                Unit</label>
                                                                            <Input type="number" name="pricePerUnit"
                                                                                   id="exampleEmail"
                                                                                   placeholder="Price per Unit"
                                                                                   onChange={(e) => {
                                                                                       this.setUnit(key,e.target.value)
                                                                                   }}/>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <button type="button" className="close"
                                                                        aria-label="Close"
                                                                        onClick={() => this.removeFromList(key)}>
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </ListGroupItem>
                                                        })
                                                    }
                                                </ListGroup>


                                            </Col>
                                        </Row>


                                        <Row className={'mt-3'}>
                                            <div className="field ml-auto mr-auto">
                                                <div className="control">
                                                    <Button type='submit' className="button is-link">Submit</Button>
                                                </div>
                                            </div>
                                        </Row>
                                    </form>
                                </CardBody>

                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AddSuppliers;
