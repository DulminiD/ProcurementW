import React, {Component} from 'react';
import swal from "sweetalert";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import LoginImg from './download.svg'
import Input from "reactstrap/es/Input";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
const db = firebase.ref("/users");

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            pwd: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const uname =  localStorage.getItem('userName')
        console.log(uname)
        if(uname !== null){
            this.props.history.push("/")
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let loging = false
        let type = ''
        db.on("value", (items)=>{
            items.forEach((item) => {
              if(item.val().username === this.state.uname && item.val().password === this.state.pwd){
                  localStorage.setItem('userName', JSON.stringify(item.val().username))
                  loging = true
                  type = item.val().type

              }
            });
            if(!loging)
                swal("Login Failed!", "Incorrect User Name and Password!", "error").then(null)
            else {
                if(type === 'SM'){
                    swal("Login Failed!", "Site Managers cannot logging to the system!", "error").then(null)
                }else {
                    swal("Login Successfully!", "User are now Login!", "success").then(() => {
                        this.props.history.push("/")
                    })
                }
            }
        });
    }

    render() {
        return (
            <div className='mt-5'>
                <div className="container ">
                    <Row>
                        <Col>
                            <Card className="card-user" style={{ backgroundColor:'#eaefea'}}>
                                <CardHeader>
                                    <CardTitle tag="h3" style={{textAlign: 'center'}}>Delivery Order Monitor
                                        Protal</CardTitle>
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

                                        <Row className={'mt-3'}>
                                            <div className="field ml-auto mr-auto">
                                                <div className="control">
                                                    <Button type='submit' className="button is-link">Login</Button>
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

export default Login;
