import React, {Component} from 'react';
import {FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "react-bootstrap";
import Payments from "./Modal/Payments";
import swal from "sweetalert";

let payment = new Payments()
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

        payment.orderID = this.props.orderid
        payment.supplierName = this.props.obj.sname
        payment.amount = this.props.tot
        payment.accountNo = this.props.obj.accountNo
        payment.branch = this.props.obj.branch
        payment.creditNote = this.state.creditNote

        payment.makePayment()
        swal("Success!", "Make payment successfully", "success").then(() => window.location.reload())

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} className='align-items-center justify-content-center' >
                    <ModalHeader>Make Payment</ModalHeader>
                    <ModalBody>
                        <p> Supplier Name :  <strong>{this.props.obj.sname}</strong></p>
                        <p> Account Number :  <strong>{this.props.obj.accountNo}</strong></p>
                        <p> Branch :  <strong>{this.props.obj.branch}</strong></p>
                        <p> Total Cost :  <strong>{this.props.tot}</strong></p>


                        <FormGroup>
                            <Label for="exampleText">Credit Note</Label>
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
