import React, { Component } from 'react';
import { TextInput, View,   Dimensions, Text } from 'react-native';
import FileUpload from "./upload";


var height = Dimensions.get('window').height;
//var width = Dimensions.get('window').width;
var ip ="localhost";

export default class En_szerkesztes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nev:"",
      image:null
    };
  }

  

  componentDidMount(){
    return fetch('http://'+ip+'/en')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });

      
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  
  render() {
    return (
      <View style={{height:height*0.35}}>
 {/*----------------------------------------------------------------nev bevitel------------------------------------------------------------- */}
      <View style={{padding: 10,backgroundColor:"#e4e5e0",alignItems:"center",borderRadius:20,marginLeft:20,marginRight:20}}>
         <Text style={{padding: 10, fontSize: 20,color:"#52633a"}}>A nevem:</Text>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:80,width:300,textAlignVertical:"top"}}
          placeholder="Írd ide a neved:"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />
{/*-------------------------------kép---------------------------------------------------------------------------------------------------- */}
    <View style={{alignItems:"center"}}>
      <FileUpload></FileUpload>
    </View>     
</View>
</View>
       
    );
  }
}