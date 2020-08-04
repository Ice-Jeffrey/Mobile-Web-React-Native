import React from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {ListItem} from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";

const api = 'https://api.github.com/users'

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
  fetch( api )
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
      following_url: item.following_url,
      login: item.login,
    });
  }

  _renderItem = ({ item }) => (
    <ListItem
      title={item.login}
      subtitle={item.html_url}
      leftAvatar={{ source: { uri: item.avatar_url } }}
      chevron={true}
      component={TouchableOpacity}
      onPress={ () =>
        /* 1. Navigate to the Details route with params */
        this.props.navigation.navigate(`Details`, {
          following_url: item.following_url.substring(0,item.following_url.length - 13),
          login: item.login,
        }
      )}
    />
  )

  render () {
    return (
      <View>
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
      following_url: this.props.navigation.getParam('following_url', 'no'),
      following: [

      ]
    }
  }

  static navigationOptions = {
    title: `Current user is following`
  };

  componentWillMount() {
    fetch( this.state.following_url )
      .then( response => response.json() )
      .then( data => {
        this.setState({ following: data, });
      })
      .catch( error => alert(error) )
  }

  _renderItem = ({item}) => {
    <ListItem
      title={item.login}
      subtitle={item.html_url}
      leftAvatar={{ source: { uri: item.avatar_url } }}
    />
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.container}>Details Screen</Text>
        <Text style={styles.container}>Current user: {this.state.login}</Text>
        {
          this.state.following.map((item) => {
            return(
              <ListItem
                title={item.login}
                subtitle={item.html_url}
                leftAvatar={{ source: { uri: item.avatar_url } }}
                key={item.avatar_url}
              />
            )
          })
        }
      </ScrollView>
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
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
});