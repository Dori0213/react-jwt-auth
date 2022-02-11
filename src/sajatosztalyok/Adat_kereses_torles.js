import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, ActivityIndicator,  Image, SafeAreaView, ScrollView} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

//var height = Dimensions.get('window').height;
//var width = Dimensions.get('window').width;
var ip = "192.168.0.55";

export default class Emlek extends Component {
  constructor(props) {
    super(props);
    let dt=new Date();
    let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+(dt.getDate());
    this.state = {

        komment:"",
        datum:teljesdat,
        date:dt,
        show:false,
        dataSource:[],
        isLoading: true,
        image:null,
    };
    
  }

  torles=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }
  fetch("http://"+ip+":8080/torles", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  )
  .then(x => x.text())
  .then(y => alert(y))
  }

  

  kereses=async () =>{
    let bemenet ={
      bevitel1:this.state.komment
    }
    fetch('http://'+ip+':3000/emlek_kereses', {
     method: "POST",
     body: JSON.stringify(bemenet),
     headers: {"Content-type": "application/json; charset=UTF-8"}
   }
   )
     .then((response) => response.json())
     .then((responseJson) => {

       this.setState({
         isLoading: false,
         komment: responseJson,
       }, function(){

       });

     })
     .catch((error) =>{
       console.error(error);
     });
   }

  render() {
     if(this.state.isLoading){
      return(
        <View style={{ padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <SafeAreaView style={{flex:1}}>
      <ScrollView nestedScrollEnabled={true}>
      <View>
{/*-------------------------------------------------KERESÉS--------------------------------------------------------------------------------- */}
      <View style={styles.kereso}>
        <TextInput
        placeholderTextColor="white"
        style={{height: 45,backgroundColor:"#ecb920", borderRadius:10, padding:10, width:240, marginTop:10,marginBottom:5,marginRight:15,marginLeft:80, textAlign:"center", }}
        placeholder="Emlék kereső"
        />

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={{width:45,height:50,backgroundColor:"#017f8d", borderRadius:10,padding:5,marginTop:10, height:45,marginRight:20}}>
        
            <MaterialIcons name='search' size={35} color={"white"}/>
          </View>
        </TouchableOpacity>
        </View>

        <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}>{item.szoveg}</Text>
          <Image  source={{uri: 'http://'+ip+':8080/'+item.kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  
        <TouchableOpacity
            style={styles.kekgomb}
            onPress={async ()=>this.torles(item.gyerekkori_id)}
        >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}>Törlés</Text>
      </TouchableOpacity>
          </View>
        }
          keyExtractor={({gyerekkori_id}, index) => gyerekkori_id}
        />
      </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}
