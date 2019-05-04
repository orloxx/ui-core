import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Navigation from '../navigation/navigation.view';

/**
 * @external {react~Component} https://reactjs.org/docs/react-component.html
 */

/**
 * Controls navigations and routes
 *
 * @class PageControl
 *
 * @example
 * const routes = [
 *   { name: 'Home', to: '/', component: HomeComponent },
 *   { name: 'Text example', to: '/some-text', component: TextComponent },
 * ];
 *
 * @example
 * <PageControl base='/' routes={routes} />
 */
class PageControl extends Component {
  /**
   * @typedef {Object} Route
   * @property {String} name - The name of the section to load. It will appear in the header of navigation
   * @property {String} to - The path to the page it will go to
   * @property {react~Component} component - The component it will load below the {@link Navigation}
   *
   * @example
   * { name: 'Some name', to: 'path/to/page', component: SomeComponent }
   */
  /**
   * @type {Object}
   * @property {String} base - The base URL used in `Router`'s `basename` attribute: default is `/`
   * @property {Array<Route>} routes - All possible routes available
   */
  static propTypes = {
    base: PropTypes.string,
    routes: PropTypes.array,
  };

  /**
   * @ignore
   */
  renderRoutes() {
    const { routes } = this.props;
    if (routes && routes.length) {
      return routes.map(page => (
        <Route key={page.to} exact path={page.to} component={page.component} />
      ));
    }
  }

  /**
   * @ignore
   */
  render() {
    const Nav = withRouter(Navigation);
    return (
      <Router basename={this.props.base || '/'}>
        <Nav routes={this.props.routes} />
        {this.renderRoutes()}
      </Router>
    );
  }
}

export default PageControl;
