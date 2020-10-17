import React, {Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../../firebase";
const db = firebase.ref("/limit");

export default class LimitService extends Component{
    constructor(props) {
        super(props);
        this.state={
            limit:'',
            climit:''
        };
        this.handleItem = this.handleItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        db.on("value", (items)=>{
            items.forEach((item) => {
                this.setState({
                    climit:item.val().limit
                });
            });
        });

    }
    handleItem(event){
        this.setState({
            limit:event.target.value
        })
    }
    handleSubmit(){
        let limit = {
            limit: this.state.limit
        };
        console.log('Came');
        db.push(limit)
            .then((res) => {
                console.log("Created new limit successfully!");
                console.log(res);
                this.setState({
                    limit: '',
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
    render() {
        return(
            <div style={{height:'50%', width:'50%', marginTop:'5%', marginLeft:'30%', backgroundColor:'#f1f1f1'}}>
                <div style={{backgroundColor:'#3fb1c6', border: '2px solid black'}}>
                    <p style={{marginLeft:'40%', color: 'white', fontSize:'20px', marginTop:'3%'}}>UPDATE LIMIT</p>
                </div>
                <div style={{ border: '2px solid black'}}>
                    <Form>
                        <h4 style={{margin:'5%'}}>The current limit!!</h4>
                        <Form.Group style={{margin:'5%'}} as={Row} controlId="formPlaintextFirstName">
                            <Col sm="10">
                                <Form.Control disabled type="text" value={this.state.climit} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextFirstName" style={{margin:'5%'}}>
                            <Form.Label column sm="8">
                                SET THE NEW LIMIT
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.limit} onChange={this.handleItem} placeholder={this.state.climit} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '30%', marginRight: '30px', backgroundColor: '#3fb1c6', marginBottom:'40px'}}>
                                UPDATE LIMIT
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }
}
