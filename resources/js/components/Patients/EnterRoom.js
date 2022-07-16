import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EnterRoomForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            patient_name: null,
            reason: null,
            email: null,
            vsee_id: null,
            visibility: true
        };
    }

    // Creating patient name state
    inputPatientName = (event) => {
        this.setState({
            patient_name: event.target.value,
        });
    }

    // Creating reason state
    inputEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    }

    // Creating reason state
    inputReason = (event) => {
        this.setState({
            reason: event.target.value,
        });
    }

    // Creating reason state
    inputVseeId = (event) => {
        this.setState({
            vsee_id: event.target.value,
        });
    }

    handleToggleVisibility() {
        this.props.setState({
            patient: this.state,
            currentChat: {
                channel: 'chat_channel_' + this.state.vsee_id,
                visibility: true
            }
        })
    }

    enterWaitingRoom = () => {
        let self = this;
        // self.handleToggleVisibility();

        axios.post('/api/room/patient', {
            name: this.state.patient_name,
            email: this.state.email,
            reason: this.state.reason,
            vsee_id: this.state.vsee_id,
        }).then(() => {
            toast.success("Employee Saved Successfully");
            self.handleToggleVisibility();
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    render() {
        return (
            <div>
            {this.state.visibility && (
                <fieldset id="enter_room_fieldset" className="mt-2">
                <legend className="container fw-bold fs-5 p-2"><i className="fa fa-video-camera me-2" aria-hidden="true"></i>Talk to An Nguyen</legend>
                <form className="container">
                    <div className="mb-3">
                        <label htmlFor="patient_name" className="form-label fw-bold">
                            Please fill your name to proceed <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" id="patient_name" name="patient_name"
                               placeholder="Your Name" onChange={this.inputPatientName}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="patient_name" className="form-label fw-bold">
                            Please fill your email, in case doctor can call you <span className="optional">(optional)</span>
                        </label>
                        <input type="email" className="form-control" id="patient_email" name="patient_email"
                               placeholder="Your Email" onChange={this.inputPatientEmail}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="reason" className="form-label  fw-bold">Reason for visit <span className="optional">(optional)</span></label>
                        <textarea className="form-control" id="reason" name="reason" rows="3"
                                  placeholder="Your reason for visit"  onChange={this.inputReason}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vsee_id" className="form-label fw-bold">
                            Vsee ID <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" id="vsee_id" name="vsee_id"
                               placeholder="Your Vsee Id for doctor to call" onChange={this.inputVseeId}/>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-warning submit" onClick={this.enterWaitingRoom}>Enter Waiting Room</button>
                    </div>
                </form>
            </fieldset>
            )}
            </div>
        );
    }
}

export default EnterRoomForm;
