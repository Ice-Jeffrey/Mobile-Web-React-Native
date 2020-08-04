import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {icon, Icon} from 'react-native-elements'

const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;
const Margin = 2;

const ImageElement = (props) => (
  <ImageBackground 
    style = {styles.Image} 
    source = {props.source}
  >
    {props.children}
  </ImageBackground>
)

const Button = (props) => (
  <TouchableOpacity 
    style = {[styles.Button, props.style]}
    onPress = {props.onPress}
  >
    <Icon
      name = {`chevron-${props.name}`}
      color = 'white'
      size = {50} 
    />
  </TouchableOpacity>
)

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Images: [
        require('./Img/STI.jpg'),
        require('./Img/DerrickWhite.jpg'),
        require('./Img/GTR-1.jpg'),
        require('./Img/round-cat.jpg'),
        require('./Img/Jordans.jpg'),
        require('./Img/JeremyAndGEM.jpg'),
        require('./Img/GingerCat.jpg'),
        require('./Img/realcat.jpg'),
        require('./Img/GameofZones.jpg'),
        require('./Img/Duke.jpg'),
        require('./Img/Lance.jpg'),
        require('./Img/GTR-2.jpg'),
      ],
      current: 0,
    }
  }

  goLeft = () => (
    this.setState({
      current: this.state.current === 0 ? this.state.Images.length - 1 : this.state.current - 1, 
    })
  )

  goRight = () => (
    this.setState({
      current: this.state.current === this.state.Images.length - 1 ? 0 : this.state.current + 1, 
    })
  )

  //image = this.state.Images[this.state.current];
  render() {
    return (
      <View style = {styles.container}>
        <ImageElement source = {this.state.Images[this.state.current]}>
          <Button 
            style = {{left:0}} 
            name = 'left'
            onPress = {this.goLeft}
          />
          <Button 
            style = {{right:0}} 
            name = 'right' 
            onPress = {this.goRight}
          />
        </ImageElement>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Image: {
    height: Height - Margin*2,
    width: Width - Margin * 2,
  },
  Button: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: Width/10,
    height: Height/10,
    top: Height/2 - Height/20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttontext: {
    fontSize: 30,
    color: 'white',
  }
});