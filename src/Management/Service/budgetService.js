import React, {Component} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Site from "../Modal/site";
import Management from "../Modal/management";


/*
Creating instances of modal classes
 */
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

    /*
    Initial value retreival
     */
    componentDidMount() {
        const uname =  localStorage.getItem('userName');
        console.log(uname);
        if(uname === null){
            this.props.history.push("/login")
        }
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

    /*
      Handling the retrived budget list and assigning to values
       */
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

    /*
    Handling the site onchange
     */
    handleSite(event){
        this.setState({
            site:event.target.value
        })
    }

    /*
    Hading the budget on change
     */
    handleBudget(event){
        this.setState({
            budget:event.target.value
        })
    }

    /*
    Calling the setbudget method in the management modal class
     */
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
            <div style={{height:'50%', width:'50%', marginTop:'5%', marginLeft:'30%', backgroundColor:'white'}}>
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
                                {this.state.bList.map(n => <tr><td>{n.site}</td><td>{n.budget}</td></tr>)}
                            </tbody>
                        </Table>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
