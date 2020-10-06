import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <a to="javascript:void(0)" className="closebtn" onClick={this.props.closeNav}>&times;</a>
                    <Link to="/budget">Budget</Link>
                    <Link to="/item">Item</Link>
                    <Link to="/limit">Limit</Link>
                    <Link to="/">Home</Link>

                </div>
            </div>
        )
    }
}

export default Navbar;
