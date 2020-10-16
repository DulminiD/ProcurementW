import React, {Component} from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
const db = firebase.ref("/suppliers");
class ViewSuppliers extends Component {

    constructor() {
        super();
        this.state = {
            suppliers : []
        }
    }

    componentDidMount() {
    db.on("value", (items) => {
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


    render() {
        const columns = [{
            Header: 'Supplier Name',
            accessor: 'sname',
            style: {
                textAlign: "center",
                fontSize: '15px'
                // color:"red"
            },
        }, {
            Header: 'Address',
            accessor: 'address',
            style: {
                textAlign: "center",
                // color:"red"
            },

            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            Header: 'Email', // Required because our accessor is not a string
            accessor: 'email',
            style: {
                textAlign: "center",
                // color:"red"
            },
            // accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: 'Contact', // Required because our accessor is not a string
            accessor: 'tel',
            style: {
                textAlign: "center",
                // color:"red"
            },
            // accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: 'Account No',
            accessor: 'accountNo',
            style: {
                textAlign: "center"
            },
            filterable: false

        }, {
            Header: 'Branch',
            accessor: 'branch',
            style: {
                textAlign: "center"
            },
            filterable: false
        }, {
            Header: "Actions",
            Cell: props => {
                return (
                    <div>
                        <Button size="small" onClick={(e) => {
                            this.props.history.push("/editsupliers/" + props.original.id)
                        }}>Edit</Button>
                    </div>
                )
            }, width: 200, minwidth: 200, maxwidth: 200,
            filterable: false
        }]


        return (



                <div className="container mt-5">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4" style={{textAlign: 'center'}}>Suppliers</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={this.state.suppliers}
                                        columns={columns}
                                        filterable
                                        defaultPageSize={15}
                                        noDataText={"Please Wait......"}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>




        );
    }
}

export default ViewSuppliers;
