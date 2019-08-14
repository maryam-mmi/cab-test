import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import GoogleMapReact from 'google-map-react';

const styles = {
  map: {
    width: '100%',
    height: '100%'
  }
};

const PinMarker = ({ key, onClick }) => {
  return (<div key={key} onClick={onClick}>
    <SvgIcon>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </SvgIcon>
  </div>)
}

const CarMarker = ({ key }) => {
  return (<div key={key}>
    <SvgIcon>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </SvgIcon>
  </div>)
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollingCars: []
    }
  }
  onMarkerClick = ({ lat, lng }) => {
    this.props.onMarkerClicked(lat, lng);
  }

  render() {
    const { addresses, vehicles } = this.props;

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDGc8nv1XEH-00QvmxoxukIWPx-sFh_AWw' }}
          defaultCenter={{
            lat: 59.3293,
            lng: 18.0686
          }}
          defaultZoom={14}
        >
          {addresses.length > 0 &&
            addresses.map((address, index) => (
              <PinMarker
                key={index}
                onClick={() => this.onMarkerClick({ lat: address.latitude, lng: address.longitude })}
                lat={address.latitude}
                lng={address.longitude}
              />
            ))
          }
          {vehicles.length > 0 &&
            vehicles.map((car, index) => (
              <CarMarker
                key={index}
                lat={car.lat}
                lng={car.lng}
              />
            ))
          }
        </GoogleMapReact>
      </div>
    );
  }
}


export default withStyles(styles)(MapContainer);