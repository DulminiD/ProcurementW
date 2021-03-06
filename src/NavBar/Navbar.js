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
import {faBookmark,faPlusCircle,faRegistered,faStreetView,faMoneyCheck} from "@fortawesome/free-solid-svg-icons";
const db = firebase.ref("/users");


class Navbar extends React.Component {

    logout = () => {
        localStorage.removeItem('userName');
        window.location.reload();
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
    };
    constructor(props) {
        super(props);
        this.state={
            user:'',
            role:'',
            management:false,
            procurement:false
        }

    }


    componentDidMount() {
        setInterval(() => {
            this.setState({
                user:JSON.parse(localStorage.getItem('userName')),
                procurement:false,
                management:false
            }, ()=>{
                db.on("value", (items)=>{
                    items.forEach((item) => {
                        if(item.val().username === this.state.user){
                            this.setState({
                                role:item.val().type
                            }, ()=> {
                                if (this.state.role === "Manager") {
                                    this.setState({
                                        management: true
                                    })
                                } else {
                                    this.setState({
                                        procurement: true
                                    })
                                }
                            })
                        }
                    });
                });
            })
        }, 2000)
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
                        {this.state.management ? (
                            <Link to="/budget"><FontAwesomeIcon icon={faMoneyBill} /><text style={{padding:'18px'}}>Budget</text></Link>
                        ): null}

                        {this.state.management ? (
                            <Link to="/item"><FontAwesomeIcon icon={faLayerGroup} /><text style={{padding:'22px'}}>Item</text></Link>
                        ): null}

                        {this.state.management ? (
                            <Link to="/limit"><FontAwesomeIcon icon={faHandPaper} /><text style={{padding:'22px'}}>Limit</text></Link>
                        ): null}
                        {this.state.management || this.state.procurement ? (
                            <Link to="/view-order-status"><FontAwesomeIcon icon={faBookmark} /><text style={{padding:'20px'}}>Orders</text></Link>
                        ): null}
                        {this.state.management ? (
                        <Link to='/reg'><FontAwesomeIcon icon={faRegistered} /><text style={{padding:'20px'}}>Register</text></Link>
                        ): null}
                        {this.state.management || this.state.procurement ? (
                        <Link to='/addsupliers'><FontAwesomeIcon icon={faPlusCircle} /><text style={{padding:'10px'}}>New Supplier</text></Link>
                        ): null}
                        {this.state.management || this.state.procurement ? (
                        <Link to='/viewsupliers'><FontAwesomeIcon icon={faStreetView} /><text style={{padding:'10px'}}>View Suppliers</text></Link>
                        ): null}
                        {this.state.management || this.state.procurement ? (
                        <Link to='/payment'><FontAwesomeIcon icon={faMoneyCheck} /><text style={{padding:'20px'}}>Payments</text> </Link>
                        ): null}

                    </div>
                    <Button  className="pl-3 pr-3 button-t" style={{position:'relative',
                        marginTop:'60%',marginLeft:'55px'}} onClick={() =>this.logout()}>Logout</Button>
                </div>
            </div>
        )
    }
}

export default Navbar;
