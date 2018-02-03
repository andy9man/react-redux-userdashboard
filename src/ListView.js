import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getUsers,
  updateView,
  deleteUser,
  USER_SELECTED,
  USER_VIEW,
  EDIT_VIEW,
  STATE_RESET
} from './store/actions';

class ListView extends Component {

  componentDidMount(){
    console.log("Attempting to load users...");
    this.props.getUsers();
  }

  render() {
    console.log(this.props);
    this.props.deleteUserSuccess &&
      setTimeout( () => {
        this.props.stateReset();
      }, 2000)

    return (
      <div className="padding-horiz-xlarge padding-vert-xlarge">

        {this.props.loadingData && <div
          style={ {
            width: '100%',
            height: '100%',
            top: '0',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          } }
        >
          <span className="loading-indicator xlarge"></span>
        </div>}

        <table className="table" summary="">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th style={ {width: '175px'} }>Actions</th>
            </tr>
          </thead>

          <tbody>
            {console.log(this.props.users)}
            {!this.props.loadingData &&
              this.props.users.map( user => (
                <tr key={user.id}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{
                    ( (d) => {
                      d = new Date(parseInt(d, 10));
                      return `${d.getMonth()+1}/${d.getDay()}/${d.getFullYear()}`;
                    })(user.createdAt)
                  }</td>
                  <td className="valign-middle">
                    <ul className="button-group tiny" style={ {marginBottom: '.5em', marginTop: '.5em'} }>

                      <li><button onClick={ () => {
                          this.props.userSelected(user.id);
                          this.props.updateView(USER_VIEW);
                        }}>View</button>
                      </li>

                      <li>
                        <button
                          onClick={ () => {
                            this.props.userSelected(user.id);
                            this.props.updateView(EDIT_VIEW);
                          }}
                        >Edit</button>
                      </li>

                      <li>
                        <button
                          onClick={ () => {
                              this.props.deleteUser(user.id, true);
                            }}
                          className="alert"
                        >Delete</button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>

        {/* -- ALERTS SECTION -- */}

        {this.props.deleteUserSuccess &&
          <div style={ {position: 'fixed', bottom: 0, right: 10, zIndex: 1000} } data-notification="" className="notification-box success">
              User was successfully deleted
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewState: state.viewState,
    loadingData: state.loadingData,
    loadingError: state.loadingError,
    deleteUserSuccess: state.deleteUserSuccess,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers() {
      dispatch( getUsers() );
    },
    userSelected(userId) {
      dispatch( {type: USER_SELECTED, payload: userId} );
    },
    updateView(view) {
      dispatch( updateView(view) );
    },
    deleteUser(address, userId) {
        dispatch( deleteUser(address, userId) );
    },
    stateReset() {
      dispatch( {type: STATE_RESET} );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
