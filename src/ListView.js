import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getUsers,
  updateView,
  deleteUser,
  dataResultHandler,
  USER_SELECTED,
  USER_VIEW,
  EDIT_VIEW,
  ADD_VIEW,
  DATA_STATUS_HANDLER,
  STATE_RESET
} from './store/actions';

class ListView extends Component {

  componentDidMount(){
    console.log("Attempting to load users...");
    this.props.getUsers();
    this.props.stateReset();
  }

  render() {
    console.log(this.props);
    this.props.deleteUserSuccess &&
      setTimeout( () => {
        this.props.stateReset();
      }, 3000)

    return (
      <div className="padding-horiz-xlarge padding-vert-xlarge">

        <div
          style={ {fontWeight: '800'} }
          className="row text-right heading-xlarge padding-right-medium"
        >
          <div className="small-6 columns text-left padding-left-medium">
            <a style={ {textDecoration: 'none'} } onClick={ () => {
                  this.props.getUsers();
                  this.props.stateReset();
            }}>&#8635;</a>
          </div>
          <div className="small-6 columns text-right padding-right-medium">
            <a style={ {textDecoration: 'none'} } onClick={
              () => (this.props.updateView(ADD_VIEW))
            }>&#43;</a>
          </div>
        </div>

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
                  <td>
                    <a onClick={ () => {
                          this.props.userSelected(user.id);
                          this.props.updateView(USER_VIEW);
                        }}>{`${user.firstName} ${user.lastName}`}</a>
                  </td>
                  <td>{user.email}</td>
                  <td>{
                    ( (d) => {
                      d = new Date(parseInt(d, 10));
                      return `${d.getMonth()+1}/${d.getDay()+1}/${d.getFullYear()}`;
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
        {this.props.loadingError && <div className="row">
          <div className="columns small-12 medium-8 small-centered margin-bottom-xlarge">
            <div className="notification-banner standalone alert">
              <span className="icon"></span>
              <h3>Don't Panic ... but there is no User Data!</h3>
              <p>
                Looks like we are having issues obtaining user data.
                Wait a few moments and try again, and/or check your internet connection.
              </p>
              <p>
                <em>Please contact us if the issue persists</em>
              </p>
              <div>
                <button onClick={ () => {
                  this.props.getUsers();
                  this.props.stateReset();
                }}>Try Again</button>
              </div>
            </div>
          </div>
        </div>}
        <div className="row">
          <a onClick={
            () => (this.props.updateView(ADD_VIEW))
          }><strong>&#43;&nbsp;</strong>Add New User</a>
        </div>

        {/* -- ALERTS SECTION -- */}

        {(this.props.loadingData && !this.props.loadingError) && <div
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

        {(this.props.deleteUserSuccess && this.props.displayAlert) &&
          <div style={ {position: 'fixed', bottom: 0, right: 10, zIndex: 1000} } data-notification="" className="notification-box success">
              User was successfully deleted
              {setTimeout( () => { this.props.dataResultHandler('displayAlert', false) }, 3000 )}
          </div>
        }
        {(this.props.loadingError && this.props.displayAlert) &&
          <div style={ {position: 'fixed', bottom: 0, right: 10, zIndex: 1000} } data-notification="" className="notification-box alert">
              Error loading user data, try again later
              {setTimeout( () => { this.props.dataResultHandler('displayAlert', false) }, 3000 )}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewState: state.viewState,
    displayAlert: state.displayAlert,
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
    dataResultHandler(dataFlag, flagValue) {
      dispatch( dataResultHandler(DATA_STATUS_HANDLER, dataFlag, flagValue) );
    },
    stateReset() {
      dispatch( {type: STATE_RESET} );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
