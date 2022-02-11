import React, { useState } from "react";
import { View, Picker, StyleSheet, Text, TouchableOpacity, } from "react-native-web";

const App = () => {
  const [selectedValue, setSelectedValue] = useState("Válaszd ki a hajad színét!");
  const [selectedValue1, setSelectedValue1] = useState("Válaszd ki a hajad színét!");  

  return (
    <View style={styles.container}>
        <View style={styles.haj}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                <Picker.Item label="Szőke" value="Szőke"/>
                <Picker.Item label="Vörös" value="Vörös"/>
                <Picker.Item label="Világosbarna" value="Világosbarna"/>
                <Picker.Item label="Sötétbarna" value="Sötétbarna"/>
                <Picker.Item label="Fekete" value="Fekete"/>
                <Picker.Item label="Ősz" value="Ősz"/>
            </Picker>
      </View>

        <View style={styles.szem}>
            <Picker
                selectedValue={selectedValue1}
                style={{ height: 50, width: 150, }}
                onValueChange={(itemValue1, itemIndex) => setSelectedValue1(itemValue1)}>
                <Picker.Item label="Kék" value="Kék"/>
                <Picker.Item label="Zöld" value="Zöld"/>
                <Picker.Item label="Világosbarna" value="Világosbarna"/>
                <Picker.Item label="Sötétbarna" value="Sötétbarna"/>
                <Picker.Item label="Fekete" value="Fekete"/>
            </Picker>
        </View>
        <View>
          {/*<TextInput
              placeholderTextColor="white"
              style={styles.magassag}
              placeholder="Milyen magas vagy?"
              onChangeText={(magassag) => this.setState({magassag})}
              value={this.state.magassag}
          />*/}
        </View>
        <TouchableOpacity 
            style={styles.gomb}
            onPress={()=> this.mentes()}>
            <Text style={styles.felirat}>Mentés</Text>
        </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },

  haj: {
    marginBottom:10,
  },

  szem:{
      marginTop:10,
  },
  gomb:{
    width:150,
    backgroundColor:"#017f8d",
    margin:5,
    borderRadius:10,
    alignItems:"center",
},

felirat:{
  textAlign:"center",
  padding:10,
  color:"#e4e5e0"
}
});

export default App;