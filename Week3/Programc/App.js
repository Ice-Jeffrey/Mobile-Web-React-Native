import React, {Component} from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const Images = [
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
]

const App = () => (
  <View style = {styles.container}>

    <View style = {styles.row}>
      <Image 
        style = {styles.bigger}
        source = {require('./Img/STI.jpg')}
      /> 
    </View>   
    
    <View style = {styles.row}>  
      <Image 
        style = {styles.normal}
        source = {require('./Img/DerrickWhite.jpg')}
      />  
      <Image 
        style = {styles.normal}
        source = {require('./Img/GTR-1.jpg')}
      />  
    </View>  
    
    <View style = {styles.row}>
      <Image 
        style = {styles.smaller}
        source = {require('./Img/round-cat.jpg')}
      />  
      <Image 
        style = {styles.smaller}
        source = {require('./Img/Jordans.jpg')}
      />  
      <Image 
        style = {styles.smaller}
        source = {require('./Img/JeremyAndGEM.jpg')}
      />  
    </View>  

    <View style = {styles.row}>
      <Image 
        style = {styles.smaller}
        source = {require('./Img/GingerCat.jpg')}
      />  
      <Image 
        style = {styles.smaller}
        source = {require('./Img/realcat.jpg')}
      />  
      <Image 
        style = {styles.smaller}
        source = {require('./Img/GameofZones.jpg')}
      />  
    </View>  

    <View style = {styles.row}>
      <Image 
        style = {styles.normal}
        source = {require('./Img/Duke.jpg')}
      />  
      <Image 
        style = {styles.normal}
        source = {require('./Img/Lance.jpg')}
      />  
    </View>

    <View style = {styles.row}>
      <Image 
        style = {styles.bigger}
        source = {require('./Img/GTR-2.jpg')}
      />  
    </View>  
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: Height,
    margin: 1,
  },
  bigger: {
    marginTop: 1,
    width: Width,
    height: Height/6,
    borderWidth: 1,
    borderColor: 'white',
  },
  normal: {
    width: Width/2,
    height: Height/6,
    borderWidth: 1,
    borderColor: 'white',
  },
  smaller: {
    width: Width/3,
    height: Height/6,
    borderWidth: 1,
    borderColor: 'white',
  }
});

export default App;