import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faHandPaper } from '@fortawesome/free-solid-svg-icons'

class Navbar extends React.Component {
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
                        <Link to='/login'>Login</Link>
                        <Link to='/reg'>Register</Link>
                        <Link to='/addsupliers'>Add Suppliers</Link>
                        <Link to='viewsupliers'>View Supplier</Link>

                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
