import React, {Component} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../firebase";
const db = firebase.ref("/item");

export default class Item extends Component{
    constructor(props) {
        super(props);
        this.state={
            item:'',
            itemList:[]
        };
        this.handleItem = this.handleItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        db.on("value", (items)=>{
            items.forEach((item) => {
                this.state.itemList.push(item.val());
                this.setState({
                    itemList:this.state.itemList
                });
            });
        });

    }
    handleItem(event){
        this.setState({
            item:event.target.value
        })
    }
    handleSubmit(){
        this.setState({
           itemList:[]
        });
        let item = {
            item: this.state.item
        };
        db.push(item)
            .then((res) => {
                console.log("Created new item successfully!");
                console.log(res);
                this.setState({
                    item: '',
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
                    <p style={{marginLeft:'40%', color: 'white', fontSize:'20px', marginTop:'3%'}}>ITEMS</p>
                </div>
                <div style={{ border: '2px solid black'}}>
                    <Form>
                        <Form.Group style={{margin:'5%'}} as={Row} controlId="formPlaintextFirstName">
                            <Form.Label column sm="8">
                                Item Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.item} onChange={this.handleItem}  />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#3fb1c6' }}>
                                ADD ITEM
                            </Button>
                        </Form.Group>
                        <div style={{marginTop:'10%', marginLeft:'5%', marginRight:'5%'}}>
                            <Table striped bordered hover variant="light">
                                <thead>
                                <tr>
                                    <th>ITEMS</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.itemList.map(n => <tr><td>{n.item}</td></tr>)}
                                </tbody>
                            </Table>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
