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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

const Header = () => (
  <View
    style = {{backgroundColor: 'white', height: 40}}
  >
    <Text style = {{fontSize: 30, color: 'black'}}>    Users</Text>
  </View>
)

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          login: 'mojombo',
          avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
          name: 'Tom Preston-Werner',
          blog: 'http://tom.preston-werner.com',
          location: 'San Francisco',
          index: 0,
          key: '0'
        },
        {
          login: 'defunkt',
          avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
          name: 'Chris Wanstrath',
          blog: 'http://chriswanstrath.com',
          location: 'San Francisco',
          index: 1,
          key: '1'
        },
        {
          login: 'pjhyett',
          avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
          name: 'PJ Hyett',
          blog: 'http://hyeet.com',
          location: 'San Francisco',
          index: 2,
          key: '2'
        },
        {
          login: 'wycats',
          avatar_url: 'https://avatars0.githubusercontent.com/u/4?v=4',
          name: 'Yehuda Katz',
          blog: 'http://yehudakatz.com',
          location: 'San Francisco',
          index: 3,
          key: '3'
        },
        {
          login: 'ezmobius',
          avatar_url: 'https://avatars0.githubusercontent.com/u/5?v=4',
          name: 'Ezra Zygmuntowicz',
          blog: 'http://stuffstr.com',
          location: 'In the NW',
          index: 4,
          key: '4'
        },
        {
          login: 'ivey',
          avatar_url: 'https://avatars0.githubusercontent.com/u/6?v=4',
          name: 'Michael D. Ivey',
          blog: 'http://gweezlebur.com',
          location: 'Bay Minette, AL',
          index: 5,
          key: '5'
        },
        {
          login: 'evanphx',
          avatar_url: 'https://avatars0.githubusercontent.com/u/7?v=4',
          name: 'Evan Phoenix',
          blog: 'http://blog.fallingsnow.net',
          location: 'Los Angeles, CA',
          index: 6,
          key: '6'
        },
        {
          login: 'vanpelt',
          avatar_url: 'https://avatars0.githubusercontent.com/u/17?v=4',
          name: 'Chris Van Pelt',
          blog: 'http://vandev.com',
          location: 'San Francisco',
          index: 7,
          key: '7'
        },
        {
          login: 'wayneeseguin',
          avatar_url: 'https://avatars0.githubusercontent.com/u/18?v=4',
          name: 'Wayne E. Seguin',
          blog: '',
          location: 'Buffalo, NY',
          index: 8,
          key: '8'
        },
        {
          login: 'brynary',
          avatar_url: 'https://avatars0.githubusercontent.com/u/19?v=4',
          name: 'Bryan Helmkamp',
          blog: 'http://codeclimate.com',
          location: 'New York City',
          index: 9,
          key: '9'
        },
        {
          login: 'kevinclark',
          avatar_url: 'https://avatars3.githubusercontent.com/u/20?v=4',
          name: 'Kevin Clark',
          blog: 'http://glu.ttono.us',
          location: null,
          index: 10,
          key: '10'
        },
      ],
      isSelect: -1,
      keyboardSpace: 50,
      keyboardShow: false,
      keyboardHide: false,
      correction: {
        name: null,
        blog: null,
        location: null,
      },
      edtitable: -1,
    }
  }

  updateKeyboardSpace(frames){
    if(!frames.endCoordinates){
       return;
    }
    let keyboardSpace = frames.endCoordinates.height;//get keyboard height

    this.setState({
        keyboardSpace: keyboardSpace
    })
  }

  itemTap = (index) => {
    // if isSelect equals to index, then set isSelect as -1 to represent fold
    let select = index;
    if (this.state.isSelect === index) {
        select = -1;
    }
    
    LayoutAnimation.easeInEaseOut(); 
    this.setState({
        isSelect: select
    })
  }

  //this is the function of the delete user
  deleteTap(index) {
    //first copy the users in case of wrong edit
    let list = [...this.state.users];
    //delete user
    list.splice(index,1);
    //update the index after delete operation
    for(let i=0;i<list.length;i++)
      list[i].index = i
    this.setState({users: list}) 
  }

  //ask the operator to confirm the delete operation
  deleteConfirm({item}) {
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

  //in case of wrong edit, update each prop separately
  NameCorrection = (text) => {
    Correction = this.state.correction
    Correction.name = text
    Correction.blog = null
    Correction.location = null
    this.setState({
      correction: Correction
    })  
  }

  BlogCorrection = (text) => {
    Correction = this.state.correction
    Correction.name = null
    Correction.blog = text
    Correction.location = null
    this.setState({
      correction: Correction
    })  
  }

  LocationCorrection = (text) => {
    Correction = this.state.correction
    Correction.name = null
    Correction.blog = null
    Correction.location = text
    this.setState({
      correction: Correction
    })  
  }

  //similar to itemTap function located above
  editTap = (index) => {
    // if the item is the same as index, the user doesn't need editing
    let editable = index;
    if (this.state.edtitable === index) {
        editable = -1;
    }
    LayoutAnimation.easeInEaseOut(); 
    this.setState({
      edtitable: editable,
    })
  }

  //once the edit button is pressed, the function begins to work
  editonPress = (index) => {
    Users = this.state.users
    Correction = this.state.correction
    if(Correction.name != null)
      Users[index].name = Correction.name
    if(Correction.blog != null)
      Users[index].blog = Correction.blog
    if(Correction.location != null)
      Users[index].location = Correction.location   
    this.setState({
      users: Users   
    })
  }

  //the render function to be called in Flatlist
  _renderItem = ({item}) => (
    <ScrollView
      keyboardShouldPersistTaps = 'never'
    >
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

      {/* check if the user needs unfolding */}
      {this.state.isSelect === item.index ?
        <KeyboardAwareScrollView><View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.Text, {fontSize: 15}]}>{`Name: ${item.name}`}</Text>
          <Text style={[styles.Text, {fontSize: 15}]}>{`Blog: ${item.blog}`}</Text>
          <Text style={[styles.Text, {fontSize: 15}]}>{`Location: ${item.location}`}</Text>
        </View></KeyboardAwareScrollView>
      : null}   

      {/* check if the user needs editing */}
      {this.state.edtitable === item.index ?
        <KeyboardAwareScrollView><View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style = {{flexDirection: 'row'}}>
          <TextInput 
            style = {[styles.Text, {fontSize: 17}]} placeholder = {'Please input something to edit name'}
            onChangeText = {(text) => this.NameCorrection(text)}
          />
          <Button
            title = 'confirm'
            onPress = {() => this.editonPress(item.index)}
          />  
        </View>
        <View style = {{flexDirection: 'row'}}>
          <TextInput 
            style = {[styles.Text, {fontSize: 17}]} placeholder = {`Please input something to edit blog`}
            onChangeText = {(text) => this.BlogCorrection(text)}
          />
          <Button 
            title = 'confirm'
            onPress = {() => this.editonPress(item.index)}
          />  
        </View>
        <View style = {{flexDirection: 'row'}}>
          <TextInput 
            style = {[styles.Text, {fontSize: 17}]} placeholder = {`Please input something to edit Location`}
            onChangeText = {(text) => this.LocationCorrection(text)}
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

  render() {
    return (
      <FlatList
        data = {this.state.users}
        renderItem = {this._renderItem} 
        extraData = {this.state}
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