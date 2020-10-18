import React, {Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../../firebase";
import Management from "../Modal/management";
const db = firebase.ref("/limit");

/*
Creating a management instance
 */
let management = new Management();

export default class LimitService extends Component{
    constructor(props) {
        super(props);
        this.state={
            limit:'',
            climit:[],
            currentLimit:''
        };
        this.handleItem = this.handleItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*
       Getting the list of available items
     */
    componentDidMount() {
        this.handleItemValue();
    }

    /*
    Handling data sent from the modal class
     */
    handleItemValue(){
        this.setState({
            climit:management.getLimit()
        }, ()=>{
            setTimeout(()=>{
                this.state.climit.map(i=>{
                    this.setState({
                        currentLimit:i.limit
                    })
                });
                this.setState({
                    currentLimit: this.state.currentLimit
                })
            }, 1000);

        });
    }

    /*
        Handling the limit added in the form
    */
    handleItem(event){
        this.setState({
            limit:event.target.value
        })
    }

    /*
        Saving the added item in the database
     */
    handleSubmit(){
        management.limit= this.state.limit;
        management.setLimit();
        this.setState({
            currentLimit:'',
            limit:''
        });
        setTimeout(()=>{
            this.handleItemValue();
        },1000)
    }
    render() {
        return(
            <div style={{height:'50%', width:'50%', marginTop:'5%', marginLeft:'30%', backgroundColor:'white'}}>
                <div style={{backgroundColor:'#3fb1c6', border: '2px solid black'}}>
                    <p style={{marginLeft:'40%', color: 'white', fontSize:'20px', marginTop:'3%'}}>UPDATE LIMIT</p>
                </div>
                <div style={{ border: '2px solid black'}}>
                    <Form>
                        <h4 style={{margin:'5%'}}>The current limit!!</h4>
                        <Form.Group style={{margin:'5%'}} as={Row} controlId="formPlaintextFirstName">
                            <Col sm="10">
                                <Form.Control disabled type="text" value={this.state.currentLimit} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextFirstName" style={{margin:'5%'}}>
                            <Form.Label column sm="8">
                                SET THE NEW LIMIT
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.limit} onChange={this.handleItem} />
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
