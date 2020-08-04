import React from "react";
import {View, Text, Button, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {ListItem} from 'react-native-elements'

//The first route: the HomeScreen
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'GitHub Users',
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [

      ]
    }
  }

  //get data from the internet
  componentDidMount() {
  fetch('https://api.github.com/users')
      .then( response => response.json() )
      .then( data => {
      let newUsers = data;
      for(let i=0;i<data.length;i++)
          Object.assign(newUsers[i], {index: i})
      this.setState({ users: newUsers, });
      })
      .catch( error => alert(error) )
  }

  onPress = () => {
    /* 1. Navigate to the Details route with params */
    this.props.navigation.navigate(`Details`, {
      /*following_url: item.following_url,
      login: item.login,*/
    });
  }

  _renderItem = ({ item }) => (
    <ListItem
      title={item.login}
      subtitle={item.html_url}
      leftAvatar={{ source: { uri: item.avatar_url } }}
      chevron={true}
      component={TouchableOpacity}
      onPress={(item) => {
        /* 1. Navigate to the Details route with params */
        this.props.navigation.navigate(`Details`, {
          following_url: `${item.following_url}`,
          login: `${item.login}`,
        });
      }}
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

//The second route: the DetailsScreen
class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      login: this.props.navigation.getParam('login', 'no'),
      following_url: this.props.navigation.getParam('following_url', 'no')
    }
  }

  static navigationOptions = {
    title: `'s following`,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>`${this.state.login}`</Text>
        <Text>`${this.state.following_url}`</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});