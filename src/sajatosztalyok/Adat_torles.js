import React from 'react';
import {StyleSheet, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native';

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
          var seged=this.state.dataSource
          for( var item of seged)
          {
            var kecske=item.datum.split("T")
            item.datum=kecske[0]
          }
          this.setState({dataSource:seged})
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
      <View style={{padding:10, marginLeft:20, marginRight:20, alignItems:"center", flexDirection:'row', flexWrap:"wrap"}}>
        {this.state.dataSource.map((item) => {

return (
            <View style={{borderWidth:1,borderRadius:10,padding:10,width:330, marginLeft:13,paddingLeft:15,backgroundColor:"#055169", marginBottom:10 }}>
              <Text style={{fontSize:20,padding:3,color:"white", alignItems:"center", fontFamily:"italic"}}>{item.datum} </Text>
              <Text style={{fontStyle:"italic",fontSize:15,padding:3, color:"white", alignItems:"center", height:50, fontFamily:"italic"}}>{item.szoveg} </Text>
              <Image  source={{uri: 'http://'+ip+':8080/'+item.kep}} style={{width:300,height:300}} /> 

              <TouchableOpacity
                style={styles.torles_gomb}
                onPress={async ()=> this.torles(item.gyerekkori_id)}
              >
                <Text style={styles.torles_gomb_felirat}>Törlés</Text>
              </TouchableOpacity>
            </View>
            
)
        })}
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
  },
  torles_gomb:{
    alignSelf: "center", 
    textAlign:"center",
    backgroundColor:"#ecb920",
    padding:10,
    borderRadius:10,
    width:150,
    marginTop:15
  },

  torles_gomb_felirat:{
    textAlign:"center",
    color:"#52633a"
  },
});