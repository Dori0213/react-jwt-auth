import React, { Component} from 'react';
import NumericInput from "react-native-numeric-input";
import { Text, View,  StyleSheet, TouchableOpacity, Picker} from 'react-native';

export default class Kulso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            szem:"",
            haj:"",
            magassag:"",
            suly:"",
            value:null
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Picker
                  selectedValue={this.state.haj}
                  onValueChange={(hajvalaszt, itemIndex) => this.setState({haj:hajvalaszt})}
                  style={styles.valaszto1}
                >
                  <Picker.Item label="Szőke" value="szoke"/>
                  <Picker.Item label="Vörös" value="voros"/>
                  <Picker.Item label="Világosbarna" value="vilagosbarna"/>
                  <Picker.Item label="Sötétbarna" value="sotetbarna"/>
                  <Picker.Item label="Fekete" value="fekete"/>
                </Picker>
                <Picker
                  selectedValue={this.state.szem}
                  onValueChange={(szemvalaszt, itemIndex) => this.setState({szem:szemvalaszt})}
                  style={styles.valaszto2}
                >
                  <Picker.Item label="Kék" value="kek"/>
                  <Picker.Item label="Zöld" value="zold"/>
                  <Picker.Item label="Világosbarna" value="vilagosbarna"/>
                  <Picker.Item label="Sötétbarna" value="sotetbarna"/>
                  <Picker.Item label="Fekete" value="fekete"/>
                </Picker>
                <NumericInput onChange={value => console.log(value)}/>
                <TouchableOpacity 
                    style={styles.gomb}
                    onPress={()=> this.mentes()}>
                    <Text style={styles.felirat}>Mentés</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        margin:5,
        marginBottom:15
    },
    valaszto1:{
        borderRadius:10,
        padding:5,
        justifyContent:'space-around',
        margin:5,
        width:200,
    },
    valaszto2:{
        margin:5,
        justifyContent:'space-around',
        padding:5,
        borderRadius:10,
        width:200
    },
    magassag:{
        color:"white",
        backgroundColor:"#ecb920",
        padding:5,
        borderRadius:10,
        textAlign:'center',
        justifyContent:'space-around',
        margin:5,
        width:200
    },
    suly:{
        color:"white",
        backgroundColor:"#ecb920",
        padding:5,
        borderRadius:10,
        textAlign:'center',
        margin:5,
        justifyContent:'space-around',
        width:200
    },
    gomb:{
        width:200,
        backgroundColor:"#017f8d",
        margin:5,
        borderRadius:10,
        alignItems:"center"
    },
    felirat:{
        textAlign:"center",
        padding:10,
        color:"#e4e5e0"
    }
})