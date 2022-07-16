import React from 'react';
import axios from "axios";

class Patient extends React.Component {
    constructor(props) {
        super(props);
    }
    // set state
    updateParentState = () => {
        this.props.setState({
            currentChat: {
                channel: 'chat_channel_' + this.props.patient.vsee_id,
                visibility: true
            },
            callId: this.props.patient.vsee_id
        })
    }
    handleBusy = () => {
        this.updateParentState();
        axios.patch('/api/room/doctor/patient/' + this.props.patient.vsee_id).then(() => {
            console.log("Announce doctor busy Successfully");
        })
    }

    inVisitClass = () => {
        return this.props.patient.vsee_id !== this.props.callId ? 'btn-warning' : 'btn-success';
    }

    render() {
        return (
            <div className="row">
                <div className="avatar col-md-1">
                    <i className="fa fa-user" aria-hidden="true"></i>
                </div>
                <div id={`patient_${this.props.patient.id}`} className="patient col-md-5">
                    <strong>{this.props.patient.name}</strong>
                    <p>{this.props.patient.reason}</p>
                </div>
                <div className="status col-md-3">
                    <span>
                        <i className="fa fa-video-camera me-1" aria-hidden="true"></i>
                        {this.props.patient.status ? 'Offline' : 'Online'}
                    </span>
                    <p>
                        <i className="fa fa-clock-o me-1" aria-hidden="true"></i>
                        <span>Waiting: 0 min</span>
                    </p>
                </div>
                <div className="actions col-md-3 d-flex">
                    <button className={`btn ${this.inVisitClass()}`} title="Chat" onClick={this.updateParentState}>
                        <i className="fa fa-comment" aria-hidden="true"></i>
                    </button>
                    <a  className={`btn ${this.inVisitClass()}`} title="Video" onClick={this.handleBusy}>
                        <i className="fa fa-video-camera" aria-hidden="true"></i>
                    </a>
                    <button className={`btn ${this.inVisitClass()}`}>...</button>
                </div>
            </div>
        );
    }
}

export default Patient;
