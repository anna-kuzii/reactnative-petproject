import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import InfoButton from '../components/info-button';
import Moisture from '../components/moisture';
import farmingData from '../api/farming-data';

type MoistureLevel = {
  level: number,
  description: string,
};

type FarmingArr = {
  moistureLevel: MoistureLevel[],
};

type State = {
  farmingArr: FarmingArr,
  modalVisible: boolean,
};

export default class MoistureInfo extends Component<State> {
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      farmingArr: farmingData,
      modalVisible: false,
    };
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 999,
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.moistureInfoWrapper}>
            <View style={styles.moistureInfoBlock}>
              <View style={styles.moistureDescription}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                  Soil Moisture
                </Text>
                <Text>
                  This describes the wetness or dryness condition of soil top
                  layers above the water table. It takes into account both past
                  conditions (previous 10 days) and future expectations of
                  rainfall, temperature, humidity and wind speed.
                </Text>
              </View>
              <View style={styles.moistureIcons}>
                <View>
                  {this.state.farmingArr.moistureLevel.map(item => (
                    <Moisture key={item.level} {...item} />
                  ))}
                </View>
              </View>
              <TouchableHighlight
                style={styles.modalBtnClose}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={{ color: '#fff' }}>X</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          style={styles.modalBtnOpen}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <InfoButton />
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  moistureInfoWrapper: {
    backgroundColor: '#ccc',
    width: '80%',
    height: 350,
    position: 'absolute',
    right: 0,
    top: 55,
    zIndex: 999,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  moistureInfoBlock: {
    marginTop: 5,
    padding: 5,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
  },
  moistureDescription: {
    width: '40%',
  },
  moistureWaves: {
    marginRight: 5,
  },
  moistureIcons: {
    width: '40%',
  },
  wave: {
    backgroundColor: 'blue',
    width: 40,
    height: 5,
    marginBottom: 2,
  },
  waveGray: {
    backgroundColor: 'gray',
    width: 40,
    height: 5,
    marginBottom: 2,
  },
  modalBtnOpen: {
    width: 30,
    height: 30,
    marginTop: 1,
  },
  modalBtnClose: {
    backgroundColor: 'blue',
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
