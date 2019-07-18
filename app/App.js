// @flow

import React, { Component } from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Routes from './routes';
import { fetchGeocode } from './redux/actions/geocode';
import Search from './components/search';

type State = {
  isSearchVisible: boolean,
};


export class App extends Component<{}, {}> {
  state = {
    isSearchVisible: false,
    city: 'Ivano-Frankivsk'
  };

  constructor (props) {
    super(props);

    this.toggleSearch = this.toggleSearch.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }

  toggleSearch() {
    this.setState({
      isSearchVisible: !this.state.isSearchVisible
    });
  }

  changeLocation(data) {
    this.setState({
      city: data
    });
  }

  render() {
    const RoutesApp = Routes(this.props);
    const isIOSLess11 =
      Platform.OS === 'ios' && parseInt(Platform.Version, 10) < 11;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="orange" />
          {isIOSLess11 && <View style={styles.statusBarBg} />}
          <View style={styles.searchHeader}>
            <TouchableHighlight
              style={styles.searchInput}
              onPress={this.toggleSearch}
              activeOpacity={0.6}
            >
              <View style={styles.searchTextBlock}>
                <Text style={styles.searchText}>{this.state.city}</Text>
                <Text style={styles.searchText}>
                  <FontAwesomeIcon name="search" color="white" size={20} />
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.geolocationArrow}
              underlayColor="rgba(255,255,255,0.3)"
              onPress={() => {
                this.props.getGeolocation();
              }}
            >
              <FontAwesomeIcon name="location-arrow" color="white" size={20} />
            </TouchableHighlight>
          </View>
          {this.state.isSearchVisible &&
          <Search
            toggleSearch={this.toggleSearch}
            changeLocation={this.changeLocation}
            getGeolocation={this.props.getGeolocation}
          />}
          <View style={styles.routes}>
            <RoutesApp geocode={this.props.location} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .9)',
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    backgroundColor: '#383838',
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 10,
    height: 30,
    justifyContent: 'center',
    width: '93%',
    marginLeft: 10
  },
  searchTextBlock: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 0
  },
  searchText: {
    color: '#fff',
    fontSize: 20
  },
  geolocationArrow: {
    width: '5%',
    margin: 5
  },
  routes: {
    flex: 11,
    flexGrow: 11,
  },
  statusBarBg: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    width: '100%',
    backgroundColor: 'orange',
  },
  safeArea: {
    backgroundColor: 'orange',
    flex: 1,
  },
});

const mapStateToProps = state => ({
  location: state.geocode.location,
});

const mapDispatchToProps = dispatch => ({
  getGeolocation: () => dispatch(fetchGeocode()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
