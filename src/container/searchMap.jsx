import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Search from '../component/search';
import Map from '../component/map';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressDataActions from "../redux/actions/addressDataActions";
import * as vehicleDataAction from "../redux/actions/vehicleDataAction";


const styles = {
  container: {
    position: 'relative',
  },
}

class SearchMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      lat: '',
      long: ''
    }
  }

  handlerChange = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  handlerClick = () => {
    if (this.state.searchText)
      this.props.addressActions.getAddresses(this.state.searchText);
  }

  onMarkerClicked = (lat, lng) => {
    if (lat && lng)
      this.props.vehicleActions.getVehicles(lat, lng);
  }

  render() {
    const { searchText } = this.state;
    const { addresses, vehicles } = this.props;
    return (
      <div >

        <Search
          value={searchText}
          onChange={this.handlerChange}
          onClick={this.handlerClick} />
        <Map onMarkerClicked={this.onMarkerClicked} addresses={addresses} vehicles={vehicles} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state,
    addresses: state.address_data.entities || [],
    vehicles: state.vehicle_data.entities || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressActions: bindActionCreators(addressDataActions, dispatch),
    vehicleActions: bindActionCreators(vehicleDataAction, dispatch),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchMap));