import React, {Component} from 'react';
import {Carousel} from "react-bootstrap";

export default class Home extends Component{
    render() {
        return(
            <div className='container-fluid' >
                <Carousel style={{marginLeft:'13%'}}>
                    <Carousel.Item style={{'height':"100%", 'width':'100%'}} >
                        <img style={{'height':"100%", 'width':'100%'}}
                             className="d-block w-100"
                             src={require('../assets/img/17.jpg')}  />
                        <Carousel.Caption>
                            <h3>Site Management System</h3>
                        </Carousel.Caption>
                    </Carousel.Item  >
                    <Carousel.Item style={{'height':"70%",'width':'100%'}}>
                        <img style={{'height':"65%", 'width':'100%'}}
                             className="d-block w-100"
                             src={require('../assets/img/18.jpg')}    />
                        <Carousel.Caption>
                            <h3>The challenge is using resources effectively </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"100%",'width':'100%'}}>
                        <img src={require('../assets/img/14.jpg')}
                             style={{'height':"100%", 'width':'100%'}}
                             className="d-block w-100"
                        />
                        <Carousel.Caption>
                            <h3>WE-27</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}
