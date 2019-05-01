import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  get currentRoute() {
    const { routes, location } = this.props;
    const route = routes.find(item => item.to === location.pathname);
    return route ? route.name : 'Home';
  }

  get routes() {
    const { routes } = this.props;
    return routes.filter(route => route.to && route.to !== '/');
  }

  toggleMenu() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  closeMenu() {
    this.setState({ isMenuOpen: false });
  }

  renderMenuButton() {
    const routes = this.routes;
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

  renderMenu() {
    const { isMenuOpen } = this.state;
    if (isMenuOpen) {
      return this.routes.map(route => (
        <li key={route.to} className='navigation__menuItem'>
          <Link
            className='navigation__menuLink' to={route.to}
            onClick={() => this.closeMenu()}>{route.name}</Link>
        </li>
      ));
    }
  }

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
          <div className='navigation__title'>{this.currentRoute}</div>
          <div className='navigation__sides'>
            {this.renderMenuButton()}
          </div>
        </section>
        <section className='navigation__menu'>
          <ul className='navigation__menuList'>{this.renderMenu()}</ul>
        </section>
      </nav>
    );
  }
}

export default Navigation;
