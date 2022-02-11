import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native';

var ip = "localhost";


export default class Adat_torles extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
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


  componentDidMount(){
    return fetch('http://'+ip+':8080/gyerekkori')
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

  olvasas=()=>{
    return fetch('http://'+ip+':8080/gyerekkori')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){
          var seged=this.state.dataSource
          for( var item of seged)
          {
            var kecske=item.datum.split("T")
            item.datum=kecske[0]
          }
          this.setState({dataSource:seged})

      });
      //alert(JSON.stringify(this.state.dataSource))
      
    })
    .catch((error) =>{
      console.error(error);
    });

  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
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
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
  }
});