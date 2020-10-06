import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import Limit from "./Management/limit";
import Item from "./Management/item";
import Budget from "./Management/budget";
import Home from "./Home/home";

class App extends React.Component {

  openNav() {
    document.getElementById("mySidenav").style.width = "230px";
    document.getElementById("main").style.marginLeft = "230px";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
  }

  // closeNav() {
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.marginLeft = "0";
  //   document.body.style.backgroundColor = "white";
  // }

  componentDidMount() {
      this.openNav();
  }

    render() {
    return (
        <div>
          <div id="main"/>
            {/*<span style={{fontSize: 30, cursor: "pointer"}}>&#9776;</span>*/}

          <BrowserRouter>
            <Navbar openNav={this.openNav} closeNav={this.closeNav}/>
            <Route path="/" exact component={Home}/>
            <Route path="/limit" exact component={Limit}/>
            <Route path="/budget" exact component={Budget}/>
            <Route path="/item" exact component={Item}/>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
