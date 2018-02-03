import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, updateView, INITIAL_VIEW, STATE_RESET } from './store/actions';

const getUserFromId = (userId, users) => {
    return users.find(user => user.id === userId);
}

class EditView extends Component {
    constructor(props) {
        super(props);

        this.state = getUserFromId( this.props.userSelected, this.props.users );

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value } );
    }

    render() {
        return (
            <div className="padding-vert-large padding-horiz-large text-left">
                <h2 className="margin-bottom-medium">Edit User</h2>
                <div className="padding-vert-medium padding-horiz-medium bg-off-white">
                    <form
                        onSubmit={ (e) => {
                            e.preventDefault();
                            const {firstName, lastName, email} = this.state;
                            const userObj = {firstName, lastName, email};
                            this.props.editUser(userObj, this.props.userSelected);
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
                            <button className="button btn-cta success expand" disabled={this.props.editUserSuccess} >Update</button>
                            </div>
                        </div>

                    </form>

                </div>

                <button className="margin-top-large button btn-cta tertiary tiny" onClick={ () => {
                    this.props.stateReset();
                    this.props.updateView(INITIAL_VIEW);
                    }}>Back</button>

                {this.props.editUserSuccess &&
                    <div style={ {position: 'fixed', bottom: 0, right: 10, zIndex: 1000} } data-notification="" className="notification-box success">
                        User was successfully updated
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userSelected: state.userSelected,
        editUserSuccess: state.deleteUserSuccess,
        editUserError: state.editUserError,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView(view) {
            dispatch( updateView(view) );
        },
        editUser(userObj, userId) {
            dispatch( editUser(userObj, userId) );
        },
        stateReset() {
          dispatch( {type: STATE_RESET} );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditView);