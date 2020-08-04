import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import {ListItem} from 'react-native-elements'
import {Users, Following} from './app/components/Users'

const api = 'https://api.github.com/users'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [

      ]
    }
  }

  //get data from the internet
  componentDidMount() {
    fetch(api)
      .then( response => response.json() )
      .then( data => {
        let newUsers = data;
        for(let i=0;i<data.length;i++)
          Object.assign(newUsers[i], {index: i})
        this.setState({ users: newUsers, });
      })
      .catch( error => alert(error) )
  }

  _renderItem = ({ item }) => (
    <ListItem
      title={item.login}
      subtitle={item.html_url}
      leftAvatar={{ source: { uri: item.avatar_url } }}
      chevron={true}
    />
  )

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.users}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={item => item.avatar_url}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});


export default App;