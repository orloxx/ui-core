import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
