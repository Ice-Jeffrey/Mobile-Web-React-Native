import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

const users = [
  {
    login: 'mojombo',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    name: 'Tom Preston-Werner',
    blog: 'http://tom.preston-werner.com',
    location: 'San Francisco',
    key: '0'
  },
  {
    login: 'defunkt',
    avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
    name: 'Chris Wanstrath',
    blog: 'http://chriswanstrath.com',
    location: 'San Francisco',
    key: '1'
  },
  {
    login: 'pjhyett',
    avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
    name: 'PJ Hyett',
    blog: 'http://hyeet.com',
    location: 'San Francisco',
    key: '2'
  },
  {
    login: 'wycats',
    avatar_url: 'https://avatars0.githubusercontent.com/u/4?v=4',
    name: 'Yehuda Katz',
    blog: 'http://yehudakatz.com',
    location: 'San Francisco',
    key: '3'
  },
  {
    login: 'ezmobius',
    avatar_url: 'https://avatars0.githubusercontent.com/u/5?v=4',
    name: 'Ezra Zygmuntowicz',
    blog: 'http://stuffstr.com',
    location: 'In the NW',
    key: '4'
  },
  {
    login: 'ivey',
    avatar_url: 'https://avatars0.githubusercontent.com/u/6?v=4',
    name: 'Michael D. Ivey',
    blog: 'http://gweezlebur.com',
    location: 'Bay Minette, AL',
    key: '5'
  },
  {
    login: 'evanphx',
    avatar_url: 'https://avatars0.githubusercontent.com/u/7?v=4',
    name: 'Evan Phoenix',
    blog: 'http://blog.fallingsnow.net',
    location: 'Los Angeles, CA',
    key: '6'
  },
  {
    login: 'vanpelt',
    avatar_url: 'https://avatars0.githubusercontent.com/u/17?v=4',
    name: 'Chris Van Pelt',
    blog: 'http://vandev.com',
    location: 'San Francisco',
    key: '7'
  },
  {
    login: 'wayneeseguin',
    avatar_url: 'https://avatars0.githubusercontent.com/u/18?v=4',
    name: 'Wayne E. Seguin',
    blog: '',
    location: 'Buffalo, NY',
    key: '8'
  },
  {
    login: 'brynary',
    avatar_url: 'https://avatars0.githubusercontent.com/u/19?v=4',
    name: 'Bryan Helmkamp',
    blog: 'http://codeclimate.com',
    location: 'New York City',
    key: '9'
  },
  {
    login: 'kevinclark',
    avatar_url: 'https://avatars3.githubusercontent.com/u/20?v=4',
    name: 'Kevin Clark',
    blog: 'http://glu.ttono.us',
    location: null,
    key: '10'
  },
]

const Button = (props) => (
  <TouchableOpacity 
    style = {[props.style, styles.Button]}
    onPress = {props.onPress}
    title = {props.text}
  >
    <Text style = {styles.Text}>{props.text}</Text>
  </TouchableOpacity>
)

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      users,
    }
  }

  Showitem = (item) => (
    <View>
      <Image 
        style = {styles.Image}
        source = {{uri: item.avatar_url}}
      />
      <Text style = {styles.Text}>{`login: ${item.login}`}</Text>
      <Text style = {styles.Text}>{`login: ${item.name}`}</Text>
      <Text style = {styles.Text}>{`login: ${item.blog}`}</Text>
      <Text style = {styles.Text}>{`login: ${item.location}`}</Text>
    </View>
  )

  render() {
    return (
      <FlatList
        data = {this.state.users}
        renderItem = {
          ({item}) => (
              <View style = {styles.container}>
                <Image 
                  source = {{uri: item.avatar_url}} 
                  style = {styles.Image}
                />
                <Text>        </Text>
                <Text style = {styles.Text}>{item.name}</Text>
                <Text>     </Text>
                <Button
                  style = {{right: 100}}
                  text = {'more'}
                />
                <Button
                  style = {styles.Button}
                  text = {"delete"}
                />
              </View>
            
          )
        }
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
    fontSize: 15
  },
  Image: {
    width: Height/8,
    height: Height/8,
    borderWidth: 2,
    borderColor: 'white'
  },
  Button: {
    position: 'relative',
    backgroundColor: 'rgba(0, 255, 255, 0.5)',
    width: Width/9,
    height: Height/30,
    right: 10,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
