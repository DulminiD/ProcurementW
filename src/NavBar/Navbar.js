import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"

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
                        <Link to="/">Home</Link>
                        <Link to="/budget">Budget</Link>
                        <Link to="/item">Item</Link>
                        <Link to="/limit">Limit</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
