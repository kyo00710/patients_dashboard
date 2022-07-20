import React from 'react';
import Patient from "./Patient";
import PatientChat from "../Chat.tsx";
import '../../../sass/dashboard.scss';
import Footer from "../Footer";
import {ToastContainer} from "react-toastify";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patients: [],
            currentChat: {
                channel: '',
                visibility: false
            },
            callId: 0
        }
    }

    // Life cycle method.
    componentDidMount() {
        this.getPatientsList();

        const channel = pusher.subscribe("patients");

        channel.bind("App\\Events\\AddPatientEvent", (data) => {
            // console.log('Method to be dispatched on trigger.' + " App\\Events\\AddPatientEvent");
            let patients = [data.patient, ...this.state.patients];
            this.setState({
                patients: patients
            });
            this.render();
        });

        channel.bind("App\\Events\\RemovePatientEvent", (data) => {
            // console.log('Method to be dispatched on trigger.' + " App\\Events\\RemovePatientEvent");
            const patients = this.state.patients.filter((item) => item.vsee_id != data.vseeId);
            this.setState({
                patients:  patients
            });
            this.render();
        });

    }

    // Get Patients List.
    getPatientsList = () => {
        let self = this;
        axios.get('/api/room/patients').then(function (response) {
            self.setState({
                patients: response.data
            });
        });
    }

    render() {
        let self = this;
        return (
            <div>
                <ToastContainer/>
                <fieldset id="dashboard_fieldset" className="mt-2">
                    <legend className="container fw-bold fs-5 p-2">
                        <i className="fa fa-bars me-2" aria-hidden="true"></i>Waiting Room
                    </legend>
                    <div className="container">
                        {!this.state.patients.length && <i className="fa fa-spinner loading" aria-hidden="true"></i>}
                        {this.state.patients.map(function (x, i) {
                            return <Patient key={i} patient={x}
                                            setState={currentChat => self.setState(currentChat)} callId={self.state.callId} />
                        })}
                    </div>
                </fieldset>
                {this.state.currentChat.visibility &&
                    <div className="chat_block">
                        <PatientChat chat_channel={this.state.currentChat.channel} chat_uuid={doctor_name}/>
                    </div>
                }
                <Footer/>
            </div>
        );
    }
}

export default Table;
