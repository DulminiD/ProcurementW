import React, {Component} from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css'
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
import Supplier from "./Model/Supplier";
let supplier = new Supplier()
class ViewSuppliers extends Component {

    constructor() {
        super();
        this.state = {
            suppliers : [],
            s:[]
        }
    }

    componentDidMount() {

        const uname =  localStorage.getItem('userName')
        if(uname === null){
            this.props.history.push("/login")
        }

            this.setState({suppliers:supplier.getSupplier()},() => {
                console.log(this.state.suppliers)
               setTimeout(() => {
                   this.state.suppliers.map(ob => {
                       this.state.s.push(ob)
                       console.log(ob)
                   })

                   this.setState({s:this.state.s})
               },2000)
            })

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
                        <Button size="small" className="pl-3 pr-3 button-t" onClick={(e) => {
                            this.props.history.push("/editsupliers/" + props.original.id)
                        }}>Edit</Button>
                    </div>
                )
            }, width: 200, minwidth: 200, maxwidth: 200,
            filterable: false
        }]


        return (



                <div className="container mt-5" style={{backgroundColor: '#eaefea'}}>
                    <Row>
                        <Col>
                            <Card style={{backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto'}}>
                                <CardHeader style={{backgroundColor: '#3fb1c6'}}>
                                    <CardTitle tag="h4" style={{textAlign: 'center'}}>Suppliers</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={this.state.s}
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
