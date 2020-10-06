import React, {Component} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../firebase";
const db = firebase.ref("/budget");

export default class Budget extends Component{
    constructor(props) {
        super(props);
        this.state={
            budget:'',
            budgetList:[]
        };
        this.handleBudget = this.handleBudget.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        db.on("value", (budgets)=>{
            budgets.forEach((budget) => {
                this.state.budgetList.push(budget.val());
                this.setState({
                    budgetList:this.state.budgetList
                });
                console.log(this.state.budgetList)
            });
        });

    }

    handleBudget(event){
        this.setState({
            budget:event.target.value
        })
    }
    handleSubmit(){
        this.setState({
            budgetList:[]
        });
        let budget = {
            budget: this.state.budget
        };

        db.push(budget)
            .then(() => {
                console.log("Created new budget successfully!");
                this.setState({
                    budget: '',
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
                    <p style={{marginLeft:'40%', color: 'white', fontSize:'20px', marginTop:'3%'}}>BUDGET</p>
                </div>
                <div style={{ border: '2px solid black'}}>
                    <Form>
                        <Form.Group style={{margin:'5%'}} as={Row} controlId="formPlaintextFirstName">
                            <Form.Label column sm="8">
                                Set Budget
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" value={this.state.budget} onChange={this.handleBudget}  />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#3fb1c6' }}>
                                ADD BUDGET
                            </Button>
                        </Form.Group>
                        <div style={{marginTop:'10%', marginLeft:'5%', marginRight:'5%'}}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>ITEMS</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.budgetList.map(n => <tr><td>{n.budget}</td></tr>)}
                            </tbody>
                        </Table>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
