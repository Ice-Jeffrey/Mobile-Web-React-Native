import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import  {ListItem}  from 'react-native-elements'
import {Following} from './Following'

export class Users extends Component {
  constructor({props}) {
    super(props);
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
          data={this.props.data}
          extraData={this.props.extraData}
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