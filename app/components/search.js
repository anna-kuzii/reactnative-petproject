import React, { Component } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, ScrollView, TouchableHighlight, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component<{}, State> {
  constructor (props) {
    super(props);

    this.closeSearch = this.closeSearch.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  selectLocation(data, details) {
    this.props.changeLocation(data.description);
    this.props.toggleSearch();
  }

  closeSearch() {
    this.props.toggleSearch();
  }

  render () {
    return (
      <ScrollView style={styles.searchContainer} keyboardShouldPersistTaps='always'>
        <View style={styles.searchHeader}>
          <TouchableHighlight
            onPress={this.closeSearch}
            style={styles.cancelButton}
          >
            <FontAwesomeIcon name="close" style={styles.cancelButtonIcon} size={20} />
          </TouchableHighlight>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            listViewDisplayed={false}
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details = null) => { this.selectLocation(data, details); }}
            getDefaultValue={() => ''}
            query={{
              key: 'AIzaSyCbgOyztPo5Kt_1ntN2pB8en3iIGVB4WWM',
              language: 'en',
              types: '(cities)'
            }}
            currentLocation={false}
            debounce={2000}
            styles={{
              textInputContainer: {
                width: '100%',
                marginTop: 0,
                backgroundColor: '#000000',
                borderTopColor: '#000000',
                borderBottomColor: '#000000'
              },
              description: {
                fontWeight: 'bold',
                color: '#ffffff',
              },
              predefinedPlacesDescription: {
                color: '#ffffff',
                backgroundColor: 'transparent'
              },
              textInput: {
                margin: 7,
                paddingLeft: 15,
                borderRadius: 8,
                backgroundColor: '#383838',
                color: '#fff',
                height: 31,
                width: '80%',
                flex: 1,
                fontSize: 20
              },
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    height: '100%',
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    position: 'absolute',
    top: 0,
    backgroundColor: '#000'
  },
  searchHeader: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },
  cancelButton: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end'
  },
  cancelButtonIcon: {
    color: '#fff',
    flex: 1,
    fontSize: 25,
    fontWeight: 'normal',
    paddingVertical: 10,
    paddingHorizontal: 5
  }
});
