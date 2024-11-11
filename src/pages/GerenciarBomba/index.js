import React, { useEffect} from "react";
import {View, Text, TouchableOpacity, Switch, TextInput} from "react-native";
import { fetchAtualizar, fetchLigarBomba, fetchDesligarBomba, fetchLigarControleManual, fetchDesLigarControleManual } from "../../../API";
import { getCurrentWPData, getDadosBomba, setWaterPumpData } from "../../../Services";
import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";




export default function GerenciarBomba(){

    const [vazao, setVazao] = React.useState(null);
    const [potencia, setPotencia] = React.useState(null);
    const [bombaStatus, setBombaStatus] = React.useState(false);
    const [statusMessage, setStatusMessage] = React.useState("");
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

    const ligarControleManual = async () =>{
        const result = await fetchLigarControleManual();
    }
    const desligarControleManual = async () =>{
        const result = await fetchDesLigarControleManual();
        setStatusMessage("");
    }

    const ligarBomba = async () =>{
        if(isEnabled == true){
            const result = await fetchLigarBomba();
            setStatusMessage(result);
            let data = await fetchAtualizar();
            const dataArray = data.split(";");
            if(dataArray[1] == "1"){
                setBombaStatus(true);
            }
            else{
                setBombaStatus(false);
            }
        }
        else{
            setStatusMessage("É necessário habilitar o controle manual");
        }
    }

    const desligarBomba = async () =>{
        if(isEnabled == true){
            const result = await fetchDesligarBomba();
            setStatusMessage("");
            setStatusMessage(result);
            const dataArray = data.split(";");
            if(dataArray[1] == "1"){
                setBombaStatus(true);
            }
            else{
                setBombaStatus(false);
            }
        }
        else{
            setStatusMessage("É necessário habilitar o controle manual");
        }
    }

    const getData = async () => {
        try{
            let wpData = await getCurrentWPData();
            let aux = wpData.split(",");
            setVazao(aux[1]);
            setPotencia(aux[2]);
            let data = await fetchAtualizar();
            const dataArray = data.split(";");
            if(dataArray[1] == "1"){
                setBombaStatus(true);
            }
            else{
                setBombaStatus(false);
            }
        }
        catch(error){

        }

    }

    const saveData = async () => {
        await setWaterPumpData(vazao, potencia);
    }

    
    useEffect(() => {
        getData();
    }, []);


    return(
        <ScrollView>
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
                {bombaStatus?
                <Text style={styles.waterpumpText}>Estado da bomba: <Text style={styles.waterPumpOn}>Ligada</Text></Text>
                :
                <Text style={styles.waterpumpText}>Estado da bomba: <Text style={styles.waterPumpOff}>Desligada</Text></Text>
                }
                
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

                <Text style={styles.statusMessage}>{statusMessage}</Text>

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
        </ScrollView>
    );
}