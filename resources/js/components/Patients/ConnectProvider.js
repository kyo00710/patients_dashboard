import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientChat from "../Chat.tsx";

class ConnectProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visibility: true,
            waiting_message_key: 'default',
            waiting_messages: {
                busy: 'Doctor is currently busy and will attend to you soon',
                default: 'Your provider will be with you shortly.',
                calling: 'The visit is in progress'
            }
        };
    }

    handleToggleVisibility() {
        this.props.setState({
            patient: null,
            currentChat: {
                channel: '',
                visibility: false
            },
        })
    }

    exitWaitingRoom = () => {
        let self = this;
        // self.handleToggleVisibility();
        axios.defaults.headers = {
            'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]')
        };

        axios.delete('/api/room/patient/' + this.props.state.patient.vsee_id)
            .then(() => {
                // toast.success("Patient dropped Waiting room Successfully");
                self.handleToggleVisibility();
            }).catch((error) => {
                toast.error(error.message);
            })
    }

    // Setup the `beforeunload` event listener
    setupBeforeUnloadListener = () => {
        const self = this;
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            // clear current user  out of waiting room
            self.exitWaitingRoom();
        });
    };

    componentDidMount() {
        // Activate the event listener
        this.setupBeforeUnloadListener();

        // handle event from pusher
        const channel = pusher.subscribe("patients");
        channel.bind("App\\Events\\CallPatientEvent", (data) => {
             console.log('Method to be dispatched on trigger.' + " App\\Events\\CallPatientEvent");
            if (parseInt(this.props.state.patient.vsee_id) !== parseInt(data.vseeId)) {
                this.setState({
                    waiting_message_key: 'busy'
                })
            } else {
                this.setState({
                    waiting_message_key: 'calling'
                })
            }
            this.render();
        });
    }


    render() {
        return (
            <div>
                <fieldset id="enter_room_fieldset" className="mt-2">
                    <legend className="container fw-bold fs-5 p-2">
                        <i className="fa fa-clock-o me-2" aria-hidden="true"></i>Connecting with your provider</legend>
                    <div className="container d-block pt-4 text-center">
                        <div className="fw-bold d-block m-5">
                            <p>{ this.state.waiting_messages[this.state.waiting_message_key] }</p>
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-warning submit" onClick={this.exitWaitingRoom}>Exit Waiting Room</button>
                        </div>
                    </div>
                    <div className="container">
                        <div className="foot pt-3 pb-1">
                            <p>If you close the video conference by mistake please, <a href="#">click here to relaunch video</a> again.</p>
                        </div>
                    </div>
                </fieldset>

                <div className="chat_block">
                    <PatientChat chat_channel={this.props.state.currentChat.channel} chat_uuid={ this.props.state.patient.patient_name ?? 'default'}/>
                </div>
            </div>
        );
    }
}

export default ConnectProvider;
