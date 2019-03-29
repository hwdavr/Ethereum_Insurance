import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button
} from 'react-native';

import { SAVE_COUNTER } from "../actions/" //Import the actions types constant we defined in our actions


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this._resetCounter = this._resetCounter.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: 'Main',
      headerRight: (
        <Button
          onPress={() => params.increaseCount()}
          title="+1"
          color="#000"
          />
      )
    };
  };

  componentDidMount() {
     this.props.navigation.setParams({increaseCount: this._increaseCount});
  }

  _increaseCount = () => {
    this.props.saveCounter(this.props.count + 1);
  }

  _resetCounter = () => {
    this.props.saveCounter(0);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.counterText}>{this.props.count}</Text>
        </View>
        <TouchableHighlight
          style={styles.resetButton}
          onPress={this._resetCounter} >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  textContainer: {
    margin: 50,
    alignSelf: 'center',
  },
  counterText: {
    fontSize: 28
  },
  resetButton: {
    marginLeft: 8,
    marginRight: 8,
    padding: 8,
    backgroundColor: 'dodgerblue',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color:'#fff',
    fontSize:18, 
    textAlign:'center',
  }
});
