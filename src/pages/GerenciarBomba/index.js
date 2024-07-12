import React, { useEffect} from "react";
import {View, Text, TouchableOpacity, Switch, TextInput} from "react-native";
import { fetchLigarBomba, fetchDesligarBomba, fetchLigarControleManual, fetchDesLigarControleManual } from "../../../API";
import { salvarDadosBombaAgua, getDadosBomba } from "../../../Services";
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

    const [vazao, setVazao] = React.useState(null);
    const [potencia, setPotencia] = React.useState(null);

    const getData = async () => {
        let data = await getDadosBomba();
        let aux = data.split("-");
        setVazao(aux[0]);
        setPotencia(aux[1]);
    }

    const saveData = async () => {
        await salvarDadosBombaAgua(vazao, potencia);
    }

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
    useEffect(() => {
        getData();
    }, []);

    return(
        <View style={styles.view}>
            <Text style={styles.title}>Gerenciar Bomba d'água</Text>

            <View style={styles.box}>
                <View style={styles.container}>
                    <Text style={styles.boxText}>Vazão (L/H):         </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setVazao}
                        value={vazao}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.boxText}>Potência (W/H):  </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPotencia}
                        value={potencia}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={(() => saveData())}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Controlar bomba manualmente</Text>
            <Text style={styles.dangerText}>Atenção: ao habilitar o controle manual, o sistema deixará de irrigar o solo de forma automática. Habilitando o controle manual, a bomba de água só ligará e desligará se você solicitar!</Text>
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