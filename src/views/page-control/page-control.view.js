import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../navigation/navigation.view';

class PageControl extends Component {
  renderRoutes() {
    const { routes } = this.props;
    if (routes && routes.length) {
      return routes.map(page => (
        <Route key={page.to} exact path={page.to} component={page.component} />
      ));
    }
  }

  render() {
    return (
      <Router basename={this.props.base}>
        <Navigation routes={this.props.routes} />
        {this.renderRoutes()}
      </Router>
    );
  }
}

PageControl.propTypes = {
  base: PropTypes.string,
  routes: PropTypes.array,
};

export default PageControl;
