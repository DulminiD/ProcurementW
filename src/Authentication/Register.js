import React, {Component} from 'react';
//import swal from "sweetalert";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Input} from "reactstrap";
import LoginImg from './download.svg'
import {Button} from "react-bootstrap";
import firebase from "../firebase";
import swal from "sweetalert";

const db = firebase.ref("/users");

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            pwd: '',
            type: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const uname =  localStorage.getItem('userName')
        console.log(uname)
        if(uname === null){
            this.props.history.push("/login")
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            username: this.state.uname,
            password: this.state.pwd,
            type: this.state.type
        }

        db.push(obj).then((res) => {
            console.log("Created new item successfully!");
            swal("Success!", "Successfully add new user", "success").then(() => this.props.history.push("/"))

        })
            .catch((e) => {
                swal("Failed!", "Failed to save data", "error").then(null)
            });


    }

    render() {
        return (
            <div className='mt-5 ml-5'>
                <div className="container " style={{backgroundColor: '#eaefea'}}>
                    <Row>
                        <Col>
                            <Card className="card-user" style={{backgroundColor: 'white'}}>
                                <CardHeader style={{backgroundColor: '#3fb1c6'}}>
                                    <CardTitle tag="h3" style={{textAlign: 'center'}}>Register New User</CardTitle>
                                </CardHeader>
                                <CardBody style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                    <Row>
                                        <div style={{width: '21em', marginBottom: '30px'}}>
                                            <img src={LoginImg} style={{width: '100%', height: '100%'}}
                                                 alt={'LoginImg'}/>
                                        </div>
                                    </Row>
                                    <form onSubmit={this.onSubmit}>
                                        <Row className={'mt-3'}>
                                            <Col className="pr-1" md="12">
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'} style={{color: 'black'}}>User
                                                            Name</label>
                                                        <Input type="text" name="email" id="exampleEmail"
                                                               placeholder="User Name" onChange={(e) => {
                                                            this.setState({uname: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className='mt-3'>
                                            <Col className="pr-3" md="12">
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'}
                                                               style={{color: 'black'}}>Password</label>
                                                        <Input type="password" name="password" id="examplePassword"
                                                               placeholder="Password" onChange={(e) => {
                                                            this.setState({pwd: e.target.value})
                                                        }}/>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className='mt-3'>
                                            <Col className="pr-3" md="12">
                                                <div className="field">
                                                    <div className="control">
                                                        <label className={'font-weight-bold'}
                                                               style={{color: 'black'}}>Role Type</label>
                                                        <Input type="select" name="type" id="exampleSelect"
                                                               onChange={(e) => {
                                                                   this.setState({type: e.target.value})
                                                               }}>
                                                            <option>Select</option>
                                                            <option value={'Manager'}>Manager</option>
                                                            <option value={'PS'}>Procurement Staff</option>
                                                            <option value={'SM'}>Site Manager</option>
                                                        </Input>
                                                    </div>
                                                </div>
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

export default Register;
