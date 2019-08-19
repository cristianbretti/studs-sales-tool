import React, { Component } from 'react';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Companies} />
          <Route path="/companies/:id" component={CompanyDetails} />
        </div>
      </Router>
    );
  }
}

export default App;
