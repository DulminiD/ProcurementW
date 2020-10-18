import React, {Component} from 'react';
//import swal from "sweetalert";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Input, ListGroup, ListGroupItem} from "reactstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
import Supplier from "./Model/Supplier";
import swal from "sweetalert";

let supplier = new Supplier()
const db = firebase.ref("/suppliers");
const db1 = firebase.ref("/item");

class EditSuppliers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            data: {
                sname: '',
                tel: '',
                email: '',
                address: '',
                accountNo: '',
                branch: '',
            }
        }
        this.onSubmit = this.onSubmit.bind(this);

    }


    componentDidMount() {

        const uname = localStorage.getItem('userName')
        if (uname === null) {
            this.props.history.push("/login")
        }

        setTimeout(() => {
            this.setState({data: supplier.getSupplierbyid(this.props.match.params.id)})
        }, 2000)


    }


    onSubmit = (e) => {
        e.preventDefault();
        supplier.updateSupplier(this.props.match.params.id, this.state.data)
        swal("Success!", "Successfully edit  supplier", "success").then(() => this.props.history.push("/viewsupliers"))
    }

    setUnit = (key, val) => {
        let array = this.state.itemList
        array[key].unit = val
        this.setState({itemList: array}, () => console.log(this.state.itemList))

    }

    render() {
        return (
            <div className='mt-5 ml-auto mr-auto' style={{backgroundColor: '#eaefea'}}>
                <div className="container ">
                    <Row>
                        <Col>
                            <Card style={{backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto'}}>
                                <CardHeader style={{backgroundColor: '#3fb1c6'}}>
                                    <CardTitle tag="h3" style={{textAlign: 'center'}}>Edit Suppliers</CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <form onSubmit={this.onSubmit}>
                                        <Row className={'mt-3'}>
                                            <Col>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'} style={{color: 'black'}}>Supplier
                                                            Name</label>
                                                        <Input type="text" name="sname" id="exampleEmail"
                                                               defaultValue={this.state.data.sname}
                                                               placeholder="User Name" onChange={(e) => {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    sname: e.target.value
                                                                }
                                                            })
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
                                                               defaultValue={this.state.data.tel}
                                                               placeholder="Contact Number" onChange={(e) => {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    tel: e.target.value
                                                                }
                                                            })
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
                                                               defaultValue={this.state.data.address}
                                                               placeholder="Address" onChange={(e) => {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    address: e.target.value
                                                                }
                                                            })
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
                                                               defaultValue={this.state.data.email}
                                                               placeholder="User Name" onChange={(e) => {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    email: e.target.value
                                                                }
                                                            })
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
                                                               defaultValue={this.state.data.accountNo}
                                                               placeholder="Bank Account Number" onChange={(e) => {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    accountNo: e.target.value
                                                                }
                                                            })
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
                                                               defaultValue={this.state.data.branch}
                                                               placeholder="Bank Name & Branch" onChange={(e) => {
                                                            this.setState({
                                                                data: {
                                                                    ...this.state.data,
                                                                    branch: e.target.value
                                                                }
                                                            })
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>


                                        <Row className={'mt-3'}>
                                            <div className="field ml-auto mr-auto">
                                                <div className="control">
                                                    <Button type='submit' className="button is-link">Edit</Button>
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

export default EditSuppliers;
