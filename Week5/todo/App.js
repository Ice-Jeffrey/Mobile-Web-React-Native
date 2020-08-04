import React, { Component } from "react";
import { Dimensions, Platform, StyleSheet, SwipeableFlatList, Text, TouchableHighlight, View } from "react-native";
import Footer from "./app/components/footer";
import Header from "./app/components/header";

//constants to get the width and the height of the window
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allComplete: false,
      value: "",
      items: [],
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  //the function to handle that all items completed, making each item complete
  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }))
    this.setState({items: newItems, allComplete: complete})
  }

  //the function to add new items into the list
  handleAddItem() {
    if (!this.state.value) 
      return;
    //customize date to be the current date
    const date = Date().slice(0,15);
    const newItems = [
      ...this.state.items, {
        date: date,
        text: this.state.value,
        //specify a special key for each item with the combination of its date and value
        key: this.state.value + date,
        //initialize the condition to be not completed
        complete: false
      }
    ]
    this.setState({items: newItems, value: "",})
  }
  
  //render items on the upper layer
  _renderItem({item})
  {
    return(
      //render items that are not complete only
      item.complete === true? null:(
      <View style={styles.row}>
        <Text>    {item.date}</Text>
        <Text>    {item.text}</Text>
      </View>)
    )
  }

  //render items slided
  _renderQuickActions({item}) {
    return (
      //use a touchableHighlight component to customize the update the condition of items
      <TouchableHighlight
        onPress={() => {
          let i;
          //find out the item's index
          for(i=0;i<this.state.items.length;i++)
          {
            if(item.key === this.state.items[i].key)
              break;
          }

          //delete the selected item from this.state.items
          const newItems = [...this.state.items];
          newItems.splice(i,1);
          this.setState({
            items: newItems,
          })
      }}>
        <View style={styles.title}><View style = {{alignItems: 'center', width: Width/5}}>
          <Text style={styles.text}>complete</Text>
        </View></View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({value})}
          onToggleAllComplete={this.handleToggleAllComplete}/>
        <View style={styles.content}>
          <SwipeableFlatList
            data={this.state.items}
            extraData={this.state}
            style={styles.content}
            renderItem={this._renderItem.bind(this)}
            renderQuickActions={this._renderQuickActions.bind(this)}
            maxSwipeDistance={Width/5}
          />
        </View>
        <Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: {
        paddingTop: 30
      }
    })
  },
  content: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: Height/8,
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  text: {
    fontSize: 15,
  },
  title: {
    backgroundColor: 'red',
    justifyContent: 'center',
    height: Height/8,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
})

export default App;