import React, { useEffect} from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { saveEspUrl, getEspUrl } from "../../../Services";
import { updateBaseUrl } from "../../../API";
import styles from "./style";



export default function GerenciarEsp() {

const [espUrl, setEspUrl] = React.useState("");
const [wasRequested, setWasRequested] = React.useState(false);
const [wasSucceeded, setWasSucceeded] = React.useState("");
const getCurrentEspUrl = async () => {
    setEspUrl(await getEspUrl());
}

const saveData = async () => {
    try{
        setWasRequested(true);
        await saveEspUrl(espUrl);
        await updateBaseUrl(espUrl); 
        setWasSucceeded(true);
    }
    catch(error){
        setWasSucceeded(false);
    }
    
}

useEffect(() =>{
    getCurrentEspUrl();
}, [])

return (
    <View style={styles.view}>
        <Text style={styles.title}>Gerenciar ESP8266</Text>
        <View style={styles.box}>
            <Text style={styles.lightBlueTitle}>Informe a Url do ESP8266</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEspUrl}
                value={espUrl}
                autoCapitalize="none"
            ></TextInput>
            <TouchableOpacity
                style={styles.button}
                onPress={(() => saveData())}
            >
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

        </View>

        {wasRequested?
            (wasSucceeded?
                <Text style={styles.greenText}>Operação bem-sucedida</Text>
                :
                <Text style={styles.redText}>Erro ao salvar os dados</Text>
            )
        :
            null
        }
    </View>
);
}