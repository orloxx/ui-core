import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  closeMenu() {
    this.setState({ isMenuOpen: false });
  }

  renderMenuButton() {
    const { routes } = this.props;
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
    const { routes } = this.props;
    if (isMenuOpen && routes && routes.length) {
      return routes.filter(route => route.to && route.to !== '/')
        .map(route => (
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
          <div className='navigation__title'>{this.props.title || 'Home'}</div>
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

Navigation.propTypes = {
  title: PropTypes.string,
  routes: PropTypes.array,
};

export default Navigation;
