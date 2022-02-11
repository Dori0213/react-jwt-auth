import axios from 'axios';
import React,{useState} from 'react';
import { Text, View, TouchableOpacity} from 'react-native-web';


function FileUpload(props) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const ip="localhost";

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData
            );
            console.log(res);
//--------------------------------------------------------------------------------------------------------------------------------------------
        alert(fileName);

        let bemenet={
            bevitel1:props.datum,
            bevitel2: props.komment,
            bevitel3:fileName
          }
          
          fetch('http://'+ip+':8080/emlekfelvitel', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            } )
            .then((response2) => response2.text())
            .then((szoveg2) => {
          
              alert(szoveg2)
              //this.setState({komment:""})
              this.props.frissit()
              
              
            })
            .catch((error) =>{
              console.error(error);
            });
//-----------------------------------------------------------------------------------------------------------------------------------------
        } catch (ex) {
            console.log(ex);
            
        }
    };

        return (
            <div className="App">
                <input type="file" onChange={saveFile} />
                <TouchableOpacity 
                    onPress={async ()=>uploadFile()}
                    style={{marginLeft:35}}>
                    <View style={{width:200,backgroundColor:"#017f8d",marginTop:10}}>
                    <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Rögzítés</Text>
                    </View>
                </TouchableOpacity>
            </div>
        );
}

export default FileUpload;