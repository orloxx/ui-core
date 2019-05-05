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
 * #### SCSS import:
 * ```
 * @import "~@orloxx/ui-core/scss/page-control";
 * ```
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
   * A Route is a place where content/resources are located at and defines
   * which `component` to load depending on the URL path.
   *
   * Children routes are optional and recursive.
   *
   * @typedef {Object} Route
   * @property {String} name - Short descriptive name of the section to load
   * @property {String} to - The path to the page it will go to
   * @property {react~Component} component - The component it will load below the {@link Navigation}
   * @property {Array<Route>} [children] - All nested routes
   *
   * @example
   * {
   *   name: 'Some name',
   *   to: 'path/to/page',
   *   component: SomeComponent,
   *   children: [{
   *     name: 'Nested component',
   *     to: 'path/to/nested',
   *     component: NestedComponent
   *   }]
   * }
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
      return Navigation.simplified(routes).map(page => (
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
