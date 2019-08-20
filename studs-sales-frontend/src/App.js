import React, { Component } from 'react';
import Companies from './containers/Companies';
import CompanyDetails from './containers/CompanyDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/companies" exact component={Companies} />
          <Route path="/companies/:id" component={CompanyDetails} />
        </div>
      </Router>
    );
  }
}

export default App;
