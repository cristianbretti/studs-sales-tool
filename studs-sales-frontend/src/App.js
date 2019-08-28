import React, { Component } from 'react';
import Companies from './containers/Companies';
import CompanyDetails from './containers/CompanyDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { usersApi, statusesApi } from './utils/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      statuses: []
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getStatuses();
  }

  getUsers = async () => {
    try {
      const { users } = await usersApi();
      const usersMap = {};
      users.forEach(user => {
        usersMap[user.id] = user.name;
      });
      this.setState({ users: usersMap });
    } catch (err) {
      console.log(err);
    }
  };

  getStatuses = async () => {
    try {
      const { statuses } = await statusesApi();
      const statusesMap = {};
      statuses.forEach(status => {
        statusesMap[status.id] = status.status;
      });
      this.setState({ statuses: statusesMap });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Router>
        <div>
          <Route
            path="/companies/:id?"
            exact
            render={props => (
              <Companies
                {...props}
                users={this.state.users}
                statuses={this.state.statuses}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
