import React, {Component} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../../firebase";
import Item from "../Modal/item";
const db = firebase.ref("/item");

/*
Creating instances
 */
let item = new Item();

export default class ItemService extends Component{
    constructor(props) {
        super(props);
        this.state={
            item:'',
            itemList:[],
            iList:[]
        };
        this.handleItem = this.handleItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    /*
       Getting the list of available items
     */
    componentDidMount() {
        const uname =  localStorage.getItem('userName');
        console.log(uname);
        if(uname === null){
            this.props.history.push("/login")
        }
        this.handleItemObject();
    }

    /*
    Handling data sent from the modal class
     */
    handleItemObject(){
        this.setState({
            itemList:item.getItems()
        }, ()=>{
            setTimeout(()=>{
                this.state.itemList.map(i=>{
                    console.log(i);
                    this.state.iList.push(i);
                });
                this.setState({
                    iList:this.state.iList
                })
            }, 1000)
        })
    }

    /*
        Handling the item name added in the form
    */
    handleItem(event){
        this.setState({
            item:event.target.value
        })

    }

    /*
        Saving the added item in the database
     */
    handleSubmit(e){
        e.preventDefault();
        item.itemID = 'item'+this.state.item;
        item.itemName = this.state.item;

        item.addItems(item);
        this.setState({
            iList:[]
        });
        setTimeout(()=>{
            this.handleItemObject()
        }, 500)
    }

    render() {

        return(
            <div style={{height:'50%', width:'50%', marginTop:'5%', marginLeft:'30%', backgroundColor:'white'}}>
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
                                {this.state.iList.map((n,i) => <tr><td>{n.itemName}</td></tr>)}
                                </tbody>
                            </Table>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
