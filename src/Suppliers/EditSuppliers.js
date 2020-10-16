import React, {Component} from 'react';
//import swal from "sweetalert";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Input, ListGroup, ListGroupItem} from "reactstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";

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

        console.log(this.props.match.params.id)

        db.on("value", (items) => {
            items.forEach((item) => {
                console.log(item.key)
                if (item.key === this.props.match.params.id) {
                    this.setState({data: item.val()}, () => console.log(this.state.data))
                }
            });
        });
    }

    // removeFromList = (index) => {
    //     console.log(index)
    //     let a = this.state.itemList
    //     a.splice(index, 1)
    //     this.setState({itemList: a})
    // }

    onSubmit = (e) => {
         e.preventDefault();
        // const obj = {
        //     sname: this.state.sname,
        //     tel: this.state.tel,
        //     email: this.state.email,
        //     address: this.state.address,
        //     accountNo: this.state.accountNo,
        //     branch: this.state.branch,
        //     itemList: this.state.itemList
        // }
        //
        // db.push(obj).then((res) => {
        //     console.log("Created new item successfully!");
        //     console.log(res);
        // })
        //     .catch((e) => {
        //         console.log(e);
        //     });

        db.child(this.props.match.params.id).update(this.state.data).then(() => {
            this.props.history.push("/viewsupliers")
        })
        console.log(this.state.data)

    }

    setUnit = (key, val) => {
        let array = this.state.itemList
        array[key].unit = val
        this.setState({itemList: array}, () => console.log(this.state.itemList))

    }

    render() {
        return (
            <div className='mt-5 ml-auto mr-auto'>
                <div className="container ">
                    <Row>
                        <Col>
                            <Card style={{backgroundColor: '#eaefea', marginLeft: 'auto', marginRight: 'auto'}}>
                                <CardHeader>
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

                                        {/*<Row className={'mt-3'}>*/}
                                        {/*    <Col md={5} style={{marginRight: 'auto', marginLeft: 'auto'}}>*/}

                                        {/*        <ListGroup>*/}

                                        {/*            {*/}
                                        {/*                this.state.itemList.map((val, key) => {*/}
                                        {/*                    return <ListGroupItem className='d-inline-block' key={key}>*/}
                                        {/*                        <p>{val.item}</p>*/}
                                        {/*                        <Col md={6}>*/}
                                        {/*                            <div className="field">*/}
                                        {/*                                <div className="control">*/}
                                        {/*                                    <label className={'font-weight-bold'}*/}
                                        {/*                                           style={{color: 'black'}}>Price per*/}
                                        {/*                                        Unit</label>*/}
                                        {/*                                    <Input type="number" name="pricePerUnit"*/}
                                        {/*                                           id="exampleEmail"*/}
                                        {/*                                           placeholder="Price per Unit"*/}
                                        {/*                                           onChange={(e) => {*/}
                                        {/*                                               this.setUnit(key,e.target.value)*/}
                                        {/*                                           }}/>*/}
                                        {/*                                </div>*/}
                                        {/*                            </div>*/}
                                        {/*                        </Col>*/}
                                        {/*                        <button type="button" className="close"*/}
                                        {/*                                aria-label="Close"*/}
                                        {/*                                onClick={() => this.removeFromList(key)}>*/}
                                        {/*                            <span aria-hidden="true">&times;</span>*/}
                                        {/*                        </button>*/}
                                        {/*                    </ListGroupItem>*/}
                                        {/*                })*/}
                                        {/*            }*/}
                                        {/*        </ListGroup>*/}


                                        {/*    </Col>*/}
                                        {/*</Row>*/}


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
