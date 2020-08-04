import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import  {ListItem}  from 'react-native-elements'

//get height and width of the screen
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

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

  _renderItem = ({ item }) => (
    <ListItem
      title={item.login}
      subtitle={item.html_url}
      leftAvatar={{ source: { uri: item.avatar_url } }}
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