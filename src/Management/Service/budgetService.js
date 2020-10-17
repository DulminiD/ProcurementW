import React, {Component} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../../firebase";
import Site from "../Modal/site";
import Management from "../Modal/management";
const db = firebase.ref("/budget");
let site = new Site();
let management = new Management();

export default class BudgetService extends Component{
    constructor(props) {
        super(props);
        this.state={
            budget:'',
            budgetList:[],
            bList:[],
            siteList:[],
            sList:[],
            site:''
        };
        this.handleBudget = this.handleBudget.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSite = this.handleSite.bind(this);
    }
    componentDidMount() {
        // db.on("value", (budgets)=>{
        //     budgets.forEach((budget) => {
        //         this.state.budgetList.push(budget.val());
        //         this.setState({
        //             budgetList:this.state.budgetList
        //         });
        //     });
        // });

        this.handleBudgetList();

        this.setState({
            siteList:site.getSites()
        }, ()=>{
            setTimeout(()=>{
                this.state.siteList.map(i=>{
                    console.log(i);
                    this.state.sList.push(i.Address);
                });
                this.setState({
                    sList:this.state.sList
                })
            }, 2000)
        })

    }
    handleBudgetList(){
        this.setState({
            budgetList:management.getBudget()
        }, ()=>{
            setTimeout(()=>{
                this.state.budgetList.map(i=>{
                    console.log(i);
                    this.state.bList.push(i);
                });
                this.setState({
                    bList:this.state.bList
                })
            }, 2000)
        })
    }

    handleSite(event){
        this.setState({
            site:event.target.value
        })
    }

    handleBudget(event){
        this.setState({
            budget:event.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        management.budget = this.state.budget;
        management.site = this.state.site;

        management.setBudget();
        this.setState({
            bList:[]
        });
        setTimeout(()=>{
            this.handleBudgetList()
        }, 500);
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
                        <Form.Group style={{margin:'5%'}} as={Row} controlId="formPlaintextFirstName">
                            <Form.Label column sm="8">
                                Set Site
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required value={this.state.site} as="select" onChange={this.handleSite}>
                                    <option>SELECT</option>
                                    {this.state.sList.map((site,i) => <option key={i} value={site}>{site}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlainButton" style={{ margin: '30px' }}>
                            <Button lg type="button" onClick={this.handleSubmit} style={{ marginLeft: '40%', marginRight: '30px', backgroundColor: '#3fb1c6' }}>
                                ADD BUDGET
                            </Button>
                        </Form.Group>
                        <div style={{marginTop:'10%', marginLeft:'5%', marginRight:'5%'}}>
                        <Table striped bordered hover variant="light">
                            <thead>
                            <tr>
                                <th>BUDGETS</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.bList.map(n => <tr><td>{n.budget}</td><td>{n.site}</td></tr>)}
                            </tbody>
                        </Table>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
