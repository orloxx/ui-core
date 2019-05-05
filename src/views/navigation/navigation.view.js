import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';

/**
 * @external {react-router-dom~withRouter} https://reacttraining.com/react-router/web/api/withRouter
 */

/**
 * Controls the navigation bar.
 * Uses the same routes object defined in {@link PageControl}
 *
 * #### SCSS import:
 * ```
 * @import "~@orloxx/ui-core/scss/navigation";
 * ```
 *
 * @example
 * const Nav = withRoute(Navigation);
 *
 * @example
 * <Nav routes={routes} />
 */
class Navigation extends Component {
  /**
   *
   * @type {Object}
   * @property {Object} location - Comes from the {@link react-router-dom~withRouter} function
   * @property {Array<Route>} routes - Same {@link Route} object defined in {@link PageControl}
   */
  static propTypes = {
    location: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  };

  /**
   * @ignore
   */
  constructor(props) {
    super(props);

    /**
     * @ignore
     */
    this.state = {
      isMenuOpen: false,
    };
  }

  /**
   * @ignore
   */
  get currentTitle() {
    const { routes, location } = this.props;
    const route = Navigation.simplified(routes).find(item => item.to === location.pathname);
    return route ? route.name : 'Home';
  }

  /**
   * @ignore
   */
  get routes() {
    const { routes } = this.props;
    return routes.filter(route => route.to && route.to !== '/');
  }

  /**
   * @ignore
   */
  static simplified(routes) {
    if (routes && routes.length) {
      return routes.reduce((previous, current) => [
        ...previous,
        current,
        ...Navigation.simplified(current.children),
      ], []);
    }
    return [];
  }

  /**
   * @ignore
   */
  toggleMenu() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  /**
   * @ignore
   */
  closeMenu() {
    this.setState({ isMenuOpen: false });
  }

  isActiveClass(pathname) {
    const { location } = this.props;
    return location && location.pathname === pathname ? 'isActive' : '';
  }

  /**
   * @ignore
   */
  renderMenuButton() {
    const routes = Navigation.simplified(this.routes);
    if (routes && routes.length) {
      return (
        <button
          className='navigation__button'
          onClick={() => this.toggleMenu()}>
          <FA icon={faBars} />
        </button>
      );
    }
  }

  /**
   * @ignore
   */
  renderNested(routes) {
    if (routes && routes.length) {
      const links = routes.map(route => (
        <li
          key={route.to}
          className='navigation__menuItem'>
          <Link
            className={`navigation__menuLink ${this.isActiveClass(route.to)}`}
            to={route.to}
            onClick={() => this.closeMenu()}>{route.name}</Link>
          {this.renderNested(route.children)}
        </li>
      ));
      return (
        <ul className='navigation__menuList'>{links}</ul>
      );
    }
  }

  /**
   * @ignore
   */
  renderMenu() {
    const { isMenuOpen } = this.state;
    if (isMenuOpen) {
      return this.renderNested(this.routes);
    }
  }

  /**
   * @ignore
   */
  render() {
    return (
      <nav className='navigation'>
        <section className='navigation__top'>
          <div className='navigation__sides'>
            <Link
              className='navigation__button' to='/'
              onClick={() => this.closeMenu()}>
              <FA icon={faHome} />
            </Link>
          </div>
          <div className='navigation__title'>{this.currentTitle}</div>
          <div className='navigation__sides'>
            {this.renderMenuButton()}
          </div>
        </section>
        <section className='navigation__menu'>
          {this.renderMenu()}
        </section>
      </nav>
    );
  }
}

export default Navigation;
