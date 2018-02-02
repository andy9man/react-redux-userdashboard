import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from './store/actions';

class ListView extends Component {

  componentDidMount(){
    console.log("Attempting to load users...");
    this.props.getUsers('users');
  }

  render() {
    console.log(this.props);
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log(this.props.users)}
            {!this.props.loadingData &&
              this.props.users.map( user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                  <td>Add Later</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewState: state.viewState,
    loadingData: state.loadingData,
    loadingError: state.loadingError,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers(filter) {
      dispatch( getUsers(filter) );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
