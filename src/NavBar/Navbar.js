import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faHandPaper } from '@fortawesome/free-solid-svg-icons'
import {Button} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import firebase from "../firebase";
import swal from "sweetalert";
const db = firebase.ref("/users");

class Navbar extends React.Component {

    logout = () => {
        localStorage.removeItem('userName');
        window.location.reload()
        console.log('lakaaa')
        confirmAlert({
            title: 'Log Out',
            message: ' Are you sure to logout',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.removeItem('userName');
                        window.location.reload()
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    constructor(props) {
        super(props);
        this.state={
            user:'',
            role:''
        }
    }
    componentDidMount() {
        this.setState({
            user:JSON.parse(localStorage.getItem('userName'))
        }, ()=>{
            console.log(this.state.user);
            db.on("value", (items)=>{
                items.forEach((item) => {
                    if(item.val().username === this.state.user){
                        this.setState({
                            role:item.val().role
                        })
                    }
                });
                swal("Login Failed!", "Incorrect User Name and Password!", "error").then(null)
            });
        })
    }

    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <div>
                        <span
                            style={{fontSize: 30, cursor: "pointer", marginLeft:'10%', color:'white'}}>&#9776;</span>
                    </div>
                    <div style={{marginTop:'10%'}}>
                        <Link to="/"><FontAwesomeIcon icon={faHome} /><text style={{padding:'20px'}}>Home</text></Link>
                        <Link to="/budget"><FontAwesomeIcon icon={faMoneyBill} /><text style={{padding:'20px'}}>Budget</text></Link>
                        <Link to="/item"><FontAwesomeIcon icon={faLayerGroup} /><text style={{padding:'20px'}}>Item</text></Link>
                        <Link to="/limit"><FontAwesomeIcon icon={faHandPaper} /><text style={{padding:'20px'}}>Limit</text></Link>
                        <Link to="/view-order-status">Orders</Link>
                        <Link to='/reg'>Register</Link>
                        <Link to='/addsupliers'>Add Suppliers</Link>
                        <Link to='/viewsupliers'>View Supplier</Link>
                        <Link to='/payment'>Payment </Link>


                    </div>
                    <Button onClick={() =>this.logout()}>Logout</Button>
                </div>
            </div>
        )
    }
}

export default Navbar;
