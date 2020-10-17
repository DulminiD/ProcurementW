import React, {Component} from 'react';
import {FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "react-bootstrap";
import firebase from "../firebase";
const db = firebase.ref().child('payment');
class Model extends Component {

    constructor() {
        super();
        this.state = {
            creditNote:'',
        }
    }



    makePayment = (e) => {
        e.preventDefault();
        const obj = {
            amount:this.props.tot,
            sname:this.props.obj.sname,
            orderid:this.props.orderid,
            creditNote:this.state.creditNote
        }

        db.push(obj).then((res) => {
            console.log(res);
            window.location.reload()
        })
            .catch((e) => {
                console.log(e);
            });

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} >
                    <ModalHeader>Make Payment</ModalHeader>
                    <ModalBody>
                        <p> Supplier Name :  <strong>{this.props.obj.sname}</strong></p>
                        <p> Account Number :  <strong>{this.props.obj.accountNo}</strong></p>
                        <p> Branch :  <strong>{this.props.obj.branch}</strong></p>
                        <p> Total Cost :  <strong>{this.props.tot}</strong></p>


                        <FormGroup>
                            <Label for="exampleText">Text Area</Label>
                            <Input type="textarea" name="text" id="exampleText" onChange={(e) => this.setState({creditNote:e.target.value})}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type={'button'} onClick={(e) => this.makePayment(e)}>Make Payment</Button>{' '}
                        <Button color="secondary"  onClick={this.props.close} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Model;
