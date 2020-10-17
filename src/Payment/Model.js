import React, {Component} from 'react';
import {FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "react-bootstrap";


class Model extends Component {

    constructor() {
        super();
        this.state = {
            creditNote:''
        }
    }

    makePayment = () => {

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
                        <p> Total Cost :  <strong>kala</strong></p>


                        <FormGroup>
                            <Label for="exampleText">Text Area</Label>
                            <Input type="textarea" name="text" id="exampleText" onChange={(e) => this.setState({creditNote:e.target.value})}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type={'button'} onClick={() => this.makePayment()}>Make Payment</Button>{' '}
                        <Button color="secondary"  onClick={this.props.close} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Model;
