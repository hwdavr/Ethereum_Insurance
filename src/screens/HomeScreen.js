import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
        <Text>{this.props.count}</Text>
        <Button
          onPress={this._resetCounter}
          title="Reset"
          color="#000"
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
