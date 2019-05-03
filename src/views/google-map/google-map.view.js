import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapModel from './google-map.model';

class GoogleMap extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.$map = React.createRef();
  }

  componentDidMount() {
    this.google = new GoogleMapModel(this.props.apiKey, this.$map.current);
  }

  render() {
    return (
      <section className='googlemap'>
        <div className='googlemap__map' ref={this.$map} />
      </section>
    );
  }
}

export default GoogleMap;
