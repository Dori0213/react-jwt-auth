import React, { Component} from 'react';
import { Text, TextInput, View, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native-web';
import FileUpload from "./upload";
import * as Speech from 'expo-speech';

var ip = "localhost";

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
        eredmeny:""
    };
    
  }

  kereses=async () =>{
    let bemenet ={
      bevitel1:this.state.eredmeny
    }

    fetch('http://'+ip+':3000/kereses', {
     method: "POST",
     body: JSON.stringify(bemenet),
     headers: {"Content-type": "application/json; charset=UTF-8"}
   }
   )
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
  
  componentDidMount(){
    this.frissit()
    
  }

  speak = (szoveg) => {
    const thingToSay = szoveg;
    //alert("Ügyi vagy gooomb :)"+thingToSay)
    Speech.speak(thingToSay);
  };



  frissit=()=>{
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

  megjelenit=()=>{
    //alert("hello")
    this.setState({show:true})
  }

  emlek_torles= async (szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch("http://"+ip+"/emlek_torles", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y=>{alert("Sikeres törlés"); this.olvasas()})
  }

  render() {
     
    return (
      <SafeAreaView style={{flex:1}}>
      <ScrollView nestedScrollEnabled={true}>
      <View>
{/*-------------------------------------------------KERESÉS--------------------------------------------------------------------------------- */}
<View style={styles.kereses_kon}>  
      <View style={styles.kereso}>
        <TextInput
        placeholderTextColor="white"
        style={styles.input}
        placeholder="Emlék kereső"
        onChangeText={(eredmeny) => this.setState({eredmeny})}
        />
        </View>
        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={styles.kereso_gomb}>
          <Text style={styles.kereso_felirat}>Keresés</Text>
          </View>
        </TouchableOpacity>
      </View>  
{/*-------------------------------------------------emlék bekérés-------------------------------------------------------------------*/}
      <View style={styles.beker_kon}>
        <View>
         <Text style={styles.emlek_szoveg}>
         Emlék leírása:
        </Text>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:80,width:300,textAlignVertical:"top"}}
          placeholder="Írd le az emléked!"
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
        />
        </View>
{/*-------------------------------------------dátum--------------------------------------------------------------------------------------- */}
      <View style={styles.datum_kon}>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:50,width:100,textAlignVertical:"center", textAlign:"center", marginTop:5, marginBottom:5}}
          placeholder="Írd be a dátumot!"
          onChangeText={(datum) => this.setState({datum})}
          value={this.state.datum}
        />
      </View>
{/*---------------------------------------------------------------------------------Kép-------------------------------------------------- */} 
<View style={{alignItems:"center"}}>
  <FileUpload komment={this.state.komment} datum={this.state.datum} frissit={()=>this.kivalaszt(this.state.dataSource)}> </FileUpload>
    </View> 
      </View>  
{/*-----------------------------------------Emlékek-------------------------------------------------------------------------------------------*/}
        <View style={{padding:10, marginLeft:20, marginRight:20, alignItems:"center", flexDirection:'row', flexWrap:"wrap"}}>
        {this.state.dataSource.map((item) => {

return (
            <View style={{borderWidth:1,borderRadius:10,padding:10,width:330, marginLeft:13,paddingLeft:15,backgroundColor:"#055169", marginBottom:10 }}>
              <Text style={{fontSize:20,padding:3,color:"white", alignItems:"center", fontFamily:"italic"}}>{item.datum} </Text>
              <Text style={{fontStyle:"italic",fontSize:15,padding:3, color:"white", alignItems:"center", height:50, fontFamily:"italic"}}>{item.szoveg} </Text>
              <Image  source={{uri: 'http://'+ip+':8080/'+item.kep}} style={{width:300,height:300}} /> 

              <TouchableOpacity
                style={styles.torles_gomb}
                onPress={async ()=> this.emlek_torles(item.gyerekkori_id)}
              >
                <Text style={styles.torles_gomb_felirat}>Törlés</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.felolvasas_gomb}
                onPress={()=>this.speak(item.szoveg)}>
                <Text style={styles.felolvasas_gomb_felirat}>Emlék felolvasása</Text>
              </TouchableOpacity>
            </View>
            
)
        })}
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  beker_kon:{
    alignSelf:"center",
    backgroundColor:"#e4e5e0",
    borderRadius:20,
    width:350,
    padding:10,
    alignItems:"center",
    marginRight:13
  },

  emlek_szoveg:{
    padding:10,
    fontSize:20,
    color:"#52633a"
  },

  felolvasas_gomb:{
    alignSelf: "center", 
    backgroundColor:"#ecb920",
    padding:10,
    borderRadius:10,
    width:150,
    marginTop:15
  },

  felolvasas_gomb_felirat:{
    textAlign:"center",
    color:"#52633a"
  },

  kereso_gomb:{
    width:60,
    height:30,
    backgroundColor:"#017f8d",
    borderRadius:10,
    padding:5,
    marginTop:10,
    marginRight:20,
    textAlign:"center",
    textAlignVertical:"center"
  },

  kereses_eredmeny:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    width:300,
    marginLeft:13,
    paddingLeft:15,
    backgroundColor:"#055169", 
    marginBottom:10
  },

  kereses_kon:{
    alignItems:"center",
    textAlign:"center",
    textAlignVertical:"center",
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    marginBottom:10,
    borderRadius:10,
  },

  kereso:{
    flexDirection:'row',
    backgroundColor:"#ecb920",
    height:50,
    borderRadius:10,
  },

  kereso_felirat:{
    textAlignVertical:"center",
    color:"white"
  },

  datum_kon:{
    marginTop:"10"
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
})