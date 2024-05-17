import React from "react";
import {View, Text, TouchableOpacity, Switch} from "react-native";
import { fetchLigarBomba, fetchDesligarBomba, fetchLigarControleManual, fetchDesLigarControleManual } from "../../../API";
import styles from "./style";


const ligarControleManual = async () =>{
    const result = await fetchLigarControleManual();
}
const desligarControleManual = async () =>{
    const result = await fetchDesLigarControleManual();
}
const ligarBomba = async () =>{
    const result = await fetchLigarBomba();
}
const desligarBomba = async () =>{
    const result = await fetchDesligarBomba();
}

export default function GerenciarBomba(){

    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => {
        if(isEnabled == false){
            setIsEnabled(true);
            ligarControleManual();
        }
        else{
            setIsEnabled(false);
            desligarControleManual();
        }
        //setIsEnabled(previousState => !previousState);
    }
    return(
        <View style={styles.view}>
            <Text style={styles.title}>Gerenciar Bomba d'água</Text>

            <Text style={styles.text}>Habilitar controle manual</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff"}}
                thumbColor={isEnabled? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            ></Switch>
            <Text style={styles.title}>Ligar bomba</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={(() => ligarBomba())}
            >
                <Text style={styles.buttonText}>Ligar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Desligar bomba</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={(() => desligarBomba())}
            >
                <Text style={styles.buttonText}>Desligar</Text>
            </TouchableOpacity>
        </View>
    );
}