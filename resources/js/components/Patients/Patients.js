import React from 'react';
import ReactDOM from 'react-dom';
import EnterRoomForm from "./EnterRoom";
import ConnectProvider from "./ConnectProvider";
import Footer from "../Footer";

class Patients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patient: null,
            currentChat: {
                channel: '',
                visibility: false
            },
        }
    }

    // Setup the `beforeunload` event listener
    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) =>
        {
            ev.preventDefault();
            return ev.returnValue = 'Are you sure you want to close?';
        });
    };

    componentDidMount() {
        // Activate the event listener
        this.setupBeforeUnloadListener();
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body text-center">
                        <h1 className="card-title fw-bold">Welcome to Code Challenge Waiting Room</h1>
                        <p className="card-text">If this is an emergency, please call 911.</p>
                    </div>
                </div>
                {!this.state.currentChat.visibility &&
                    <EnterRoomForm setState={state => this.setState(state)} />
                }
                {this.state.currentChat.visibility
                    && <ConnectProvider state={this.state} setState={state => this.setState(state)}/>}
                <Footer/>
            </div>
        );
    }
}

export default Patients;
