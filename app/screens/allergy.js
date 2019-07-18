//@flow
import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import CircularCharts from '../components/circular-chart';
import Share from 'react-native-share';
import connect from 'react-redux/es/connect/connect';

type Props = {
  location: {
    geocode: string,
    city?: string,
  },
  allergy: Array<any>,
  breathing: Array<any>,
};

class Allergy extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  async onShare() {
    const shareOptions = {
      title: 'Allergy Tracker',
      message: 'Allergy Tracker Page',
      url: 'https://weather.com/forecast/allergy/l/CHXX0008:1:CH',
      subject: 'Allergy Tracker',
    };
    try {
      await Share.open(shareOptions);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { location: { city }, allergy, breathing } = this.props;

    return (
      <ImageBackground
        style={styles.container}
        source={{ uri: 'https://s.w-x.co/lifestyle-allergy-bg-desktop.png' }}
      >
        <ScrollView>
          <Text style={styles.title}>Allergy Tracker</Text>
          <Text style={styles.subTitle}>{city}</Text>
          <CircularCharts chartData={allergy} />
          <View style={styles.divider} />
          <CircularCharts chartData={breathing} size={150} />
          <TouchableHighlight
            style={styles.button}
            underlayColor="rgba(255,255,255,0.3)"
            onPress={() => this.onShare()}
          >
            <Text style={styles.buttonTitle}>Share</Text>
          </TouchableHighlight>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
  },
  title: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 30,
    marginTop: 10,
  },
  subTitle: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
  divider: {
    width: '90%',
    borderTopColor: '#fff',
    borderTopWidth: 1,
    alignSelf: 'center',
  },
  button: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  allergy: state.allergy.allergyData,
  breathing: state.breathing.breathingData,
});

export default connect(mapStateToProps)(Allergy);
