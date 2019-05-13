import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, HashRouter, Route, withRouter } from 'react-router-dom';
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
   * @property {Array<Route>} routes - All possible routes available
   * @property {Boolean} [useHash] - If set to `true` it enables the routing using the url hash `/#/path`
   * @property {String} [base] - The base URL used in `Router`'s `basename` attribute: default is `/`
   */
  static propTypes = {
    routes: PropTypes.array.isRequired,
    useHash: PropTypes.bool,
    base: PropTypes.string,
  };

  /**
   * @ignore
   */
  static defaultProps = {
    useHash: true,
    base: '/',
    routes: [],
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
  renderBrowserRouter() {
    const Nav = withRouter(Navigation);
    return (
      <Router basename={this.props.base}>
        <Nav routes={this.props.routes} />
        {this.renderRoutes()}
      </Router>
    );
  }

  /**
   * @ignore
   */
  renderHashRouter() {
    const Nav = withRouter(Navigation);
    return (
      <HashRouter basename={this.props.base}>
        <Nav routes={this.props.routes} />
        {this.renderRoutes()}
      </HashRouter>
    );
  }

  /**
   * @ignore
   */
  render() {
    if (this.props.useHash) {
      return this.renderHashRouter();
    }
    return this.renderBrowserRouter();
  }
}

export default PageControl;
