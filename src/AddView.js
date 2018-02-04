import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, updateView, dataResultHandler, INITIAL_VIEW, DATA_STATUS_HANDLER, STATE_RESET } from './store/actions';

class AddView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value } );
    }

    render() {
        return (
            <div className="padding-vert-large padding-horiz-large text-left">
                <h2 className="margin-bottom-medium">Create User</h2>
                <div className="padding-vert-medium padding-horiz-medium bg-off-white">
                    <form
                        onSubmit={ (e) => {
                            e.preventDefault();
                            const {firstName, lastName, email} = this.state;
                            const userObj = {firstName, lastName, email};
                            this.props.addUser(userObj);
                        }}
                    >
                        <div className="row">
                            <div className="large-5 medium-8 small-12 columns md-text-field with-floating-label">
                                <input type="text" id="firstName" name="firstName" onChange={this.handleChange} value={this.state.firstName} required />
                                <label htmlFor="firstName">Fist Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="large-5 medium-8 small-12 columns md-text-field with-floating-label">
                                <input type="text" id="lastName" name="lastName" onChange={this.handleChange} value={this.state.lastName} required />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="large-5 medium-8 small-12 columns md-text-field with-floating-label">
                                <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="large-5 medium-8 small-12 columns md-text-field with-floating-label">
                            <button className="button btn-cta success expand" disabled={this.props.addUserSuccess} >Create</button>
                            </div>
                        </div>

                    </form>

                </div>

                <button className="margin-top-large button btn-cta tertiary tiny" onClick={ () => {
                    this.props.stateReset();
                    this.props.updateView(INITIAL_VIEW);
                    }}>Back</button>

                {(this.props.addUserSuccess && this.props.displayAlert) &&
                    <div style={ {position: 'fixed', bottom: 0, right: 10, zIndex: 1000} } data-notification="" className="notification-box success">
                        User was successfully created
                        {setTimeout( () => { this.props.dataResultHandler('displayAlert', false) }, 3000 )}
                    </div>
                }
                { (this.props.addUserError && this.props.displayAlert) &&
                    <div style={ {position: 'fixed', bottom: 0, right: 10, zIndex: 1000} } data-notification="" className="notification-box alert">
                        Error creating user
                        {setTimeout( () => { this.props.dataResultHandler('displayAlert', false) }, 3000 )}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        displayAlert: state.displayAlert,
        addUserSuccess: state.addUserSuccess,
        addUserError: state.addUserError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView(view) {
            dispatch( updateView(view) );
        },
        addUser(userObj, userId) {
            dispatch( addUser(userObj) );
        },
        dataResultHandler(dataFlag, flagValue) {
          dispatch( dataResultHandler(DATA_STATUS_HANDLER, dataFlag, flagValue) );
        },
        stateReset() {
            dispatch( {type: STATE_RESET} );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddView);