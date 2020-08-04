import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  Alert,
  TextInput,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {ListItem} from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//get height and width of the window
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;
 
//Header of the application layout
const Header = () => (
  <View
    style = {{backgroundColor: 'black', height: 30}}
  >
    <Text style = {{fontSize: 20, color: 'white'}}>GitHub Users</Text>
  </View>
)
 
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [
          
      ],
      isSelect: -1,
      keyboardSpace: 50,
      keyboardShow: false,
      keyboardHide: false,
      correction: {
        node_id: null,
        url: null,
        html_url: null,
      },
      edtitable: -1,
    }
  }
  
  //get data from the internet
  componentWillMount() {
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

  //function operating on the keyboard event
  updateKeyboardSpace(frames){
    if(!frames.endCoordinates){
      return;
    }
    let keyboardSpace = frames.endCoordinates.height;//get keyboard heights
      
    this.setState({
      keyboardSpace: keyboardSpace
    })
  }
  
  //the rendering function when you tap the users' information
  itemTap = (index) => {
    // if the 'item' is the same as index, change the select to be -1 to represents fold
    let select = index;
    if (this.state.isSelect === index) {
      select = -1;
    }
    //generate animation
    LayoutAnimation.easeInEaseOut();
    //update indexes of users to be unfold
    this.setState({
      isSelect: select
    })
  }
  
  //rendering function when you touch the delete button
  deleteTap(index) {
    let list = [...this.state.users];
    //remove elements from this.state.users
    list.splice(index,1);
    //update indexes of each user in case of wrong edit
    for(let i=0;i<list.length;i++)
      list[i].index = i
    this.setState({users: list})
  }
  
  deleteConfirm({item}) {
    //ask the operator to confirm the delete command
    Alert.alert(
      'Delete',
      'Are you sure to delete the user?',
      [
        {text: 'Yes', onPress: () => this.deleteTap(item.index) },
        {text: 'Cancel', onPress: null}
      ],
      {cancelable: false}
    )
  }
  
  //edit each prop separately in case of wrong edit
  node_idCorrection = (text) => {
    Correction = this.state.correction
    Correction.node_id = text
    Correction.url = null
    Correction.html_url = null
    this.setState({
        correction: Correction
    })
  }
  
  urlCorrection = (text) => {
    Correction = this.state.correction
    Correction.node_id = null
    Correction.url = text
    Correction.html_url = null
    this.setState({
      correction: Correction
    })
  }
  
  html_urlCorrection = (text) => {
    Correction = this.state.correction
    Correction.node_id = null
    Correction.url = null
    Correction.html_url = text
    this.setState({
      correction: Correction
    })
  }
  
  //similar to the itemTap function which has been initialized before
  editTap = (index) => {
    // if editable equals to index, then fold
    let editable = index;
    if (this.state.edtitable === index) {
      editable = -1;
    }
      
    LayoutAnimation.easeInEaseOut();
    this.setState({
      edtitable: editable,
    })
  }
  
  editonPress = (index) => {
    //copy users first in case of wrong edit
    Users = this.state.users
    Correction = this.state.correction
    //check each prop separately in case of the wrong edit
    if(Correction.node_id != null)
      Users[index].node_id = Correction.node_id
    if(Correction.url != null)
      Users[index].url = Correction.url
    if(Correction.html_url != null)
      Users[index].html_url = Correction.html_url  
    this.setState({
      users: Users  
    })
  }
  
  //render function of Flatlist
  _renderItem = ({item}) => (
    <ScrollView
        keyboardShouldPersistTaps = 'never'
    >
      {/*set each user as a direct button*/}
      <TouchableOpacity
        style={styles.container}
        onPress = {() => this.itemTap(item.index)}
      >
        <Image 
          style = {styles.Image}
          source = {{uri: item.avatar_url}}
        />
        <Text style = {styles.Text}>      {item.login}</Text>  
        <Text>     </Text>
        <Button
          onPress={() => {this.deleteConfirm({item})}}
          title='delete'
        />
        <Text>     </Text>
        <Button
          title = 'Edit'
          onPress = {() => this.editTap(item.index)}
        />  
      </TouchableOpacity>
        
      {/*check if the user needs unfolding*/}
      {this.state.isSelect === item.index ?
        <KeyboardAwareScrollView><View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.Text, {fontSize: 15}]}>{`node_id: ${item.node_id}`}</Text>
          <Text style={[styles.Text, {fontSize: 15}]}>{`url: ${item.url}`}</Text>
          <Text style={[styles.Text, {fontSize: 15}]}>{`html_url: ${item.html_url}`}</Text>
        </View></KeyboardAwareScrollView>
      : null}  
      
      {/*check if the user needs editing*/}
      {this.state.edtitable === item.index ?
      <KeyboardAwareScrollView><View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style = {{flexDirection: 'row'}}>
          <TextInput 
          style = {[styles.Text, {fontSize: 17}]} placeholder = {'Please input something to edit node_id'}
          onChangeText = {(text) => this.node_idCorrection(text)}
          />
          <Button
          title = 'confirm'
          onPress = {() => this.editonPress(item.index)}
          />  
        </View>
        <View style = {{flexDirection: 'row'}}>
          <TextInput 
          style = {[styles.Text, {fontSize: 17}]} placeholder = {`Please input something to edit url`}
          onChangeText = {(text) => this.urlCorrection(text)}
          />
          <Button 
          title = 'confirm'
          onPress = {() => this.editonPress(item.index)}
          />  
        </View>
        <View style = {{flexDirection: 'row'}}>
          <TextInput 
          style = {[styles.Text, {fontSize: 17}]} placeholder = {`Please input something to edit html_url`}
          onChangeText = {(text) => this.html_urlCorrection(text)}
          />
          <Button 
          title = 'confirm'
          onPress = {() => this.editonPress(item.index)}
          />  
        </View>
      </View></KeyboardAwareScrollView>
      :null}
    </ScrollView>
  )
  
  //render Flatlist
  render() {
    return (
      <FlatList
        data = {this.state.users}
        renderItem = {this._renderItem} 
        extraData = {this.state}
        keyExtractor = {(item) => {
          return item.avatar_url;
        }}
        ListHeaderComponent = {() => Header()}
      /> 
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 20
  },
  Image: {
    width: Height/8,
    height: Height/8,
    borderWidth: 2,
    borderColor: 'white'
  },
  Box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 2,
    width: Width,
  },
});