import React from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, updateView, INITIAL_VIEW } from './store/actions';

const getUserFromId = (userId, users) => {
    return users.find(user => user.id === userId);
}

const UserView = props => {
    const currentUser = getUserFromId( props.userSelected, props.users );
    return (
        <div className="padding-vert-large padding-horiz-large text-left">
            <h2 className="margin-bottom-medium">User View</h2>
            <div className="padding-vert-medium padding-horiz-medium bg-off-white">
                <p><span style={ {marginRight: '20px'} }>Full Name:</span> {currentUser.name}</p>
                <p><span style={ {marginRight: '20px'} }>Email:</span> {currentUser.email}</p>
                <p><span style={ {marginRight: '20px'} }>Created At:</span> {currentUser.createdAt}</p>
                <p><span style={ {marginRight: '20px'} }>User ID:</span> {currentUser.id}</p>
            </div>

            <div className="margin-vert-small">
                <ul className="button-group tiny" style={ {marginBottom: '.5em', marginTop: '.5em'} }>
                    <li><button className="button btn-cta">Edit</button></li>
                    <li><button onClick={
                        () => {
                            props.deleteUser(props.userSelected);
                            props.updateView(INITIAL_VIEW);
                        }
                    } className="button btn-cta alert">Delete</button></li>
                </ul>

                <ul className="margin-top-medium button-group tiny" style={ {marginBottom: '.5em', marginTop: '.5em'} }>
                    <li><button onClick={ () => (props.updateView(INITIAL_VIEW)) } className="button btn-cta tertiary">Back</button></li>
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userSelected: state.userSelected,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateView(view) {
            dispatch( updateView(view) );
        },
        deleteUser(address, userId) {
            dispatch( deleteUser(address, userId) );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);