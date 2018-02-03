import React, { Component } from 'react';
import { connect } from 'react-redux'
import ListView from './ListView';
import UserView from './UserView';
import {INITIAL_VIEW, USER_VIEW} from './store/actions';

class App extends Component {
  render() {
    return (
      <div className="margin-vert-medium margin-horiz-medium" style={ {height: '100vh', width: '100vw'} }>
        <header>
          <h1><strong>User Dashboard</strong></h1>
        </header>

        { this.props.appViewState === INITIAL_VIEW && <ListView /> }
        { this.props.appViewState === USER_VIEW && <UserView /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appViewState: state.viewState
  }
}

export default connect(mapStateToProps)(App)
