import React, { useEffect} from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./style";
import { TextInput } from "react-native-gesture-handler";
import { fetchDefinirNiveisUmidade } from "../../../API";
import { saveHumidityLevels, getHumidityLevels } from "../../../Services";

export default function DefinirUmidade() {
    const [umidadeOn, setUmidadeOn] = React.useState(null);
    const [umidadeOff, setUmidadeOff] = React.useState(null);
    const [wasRequested, setWasRequested] = React.useState(false);
    const [isSucceeded, setIsSucceeded] = React.useState(null);

    const getData = async () => {
        let data = await getHumidityLevels();
        let aux = data.split("-");
        setUmidadeOn(aux[0]);
        setUmidadeOff(aux[1]);
    }

    const sendData = async () => {
        try{
            setWasRequested(true);
            setIsSucceeded(null);
            console.log("sendData was called");
            const data = (umidadeOn + ";" + umidadeOff);
            const response = await fetchDefinirNiveisUmidade(data);
            console.log("A response: " + response);
            if(response){
                console.log("Deu verdadeiro");
                setIsSucceeded(true);
                saveHumidityLevels(umidadeOn, umidadeOff); 
            }
            else{
                setIsSucceeded(false);
            }  
        }
        catch(error){
            console.log("Algum erro ocorreu -> " + error);
        }   
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView>
            
            <View style={styles.view}>
                <Text style={styles.title}>Definir níveis de umidade</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>Umidade mínima do solo (%): </Text>
                    <TextInput style={styles.input}
                        onChangeText={setUmidadeOn}
                        value={umidadeOn}
                        keyboardType="numeric"
                    />

                    <Text style={styles.text}>Umidade máxima do solo (%): </Text>
                    <TextInput style={styles.input}
                        onChangeText={setUmidadeOff}
                        value={umidadeOff}
                        keyboardType="numeric"
                    />

                </View>

                <TouchableOpacity style={styles.button}
                    onPress={(() => sendData())}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                {wasRequested && (
                    isSucceeded ? (
                        <Text style={styles.greenText}>Níveis de umidade salvos com sucesso!</Text>)
                        : (
                        <Text style={styles.redText}>Os dados não foram salvos. Erro de comunicação</Text>) 
                    )
                }
                
                <Image
                    style={styles.image}
                    source={require("../../../assets/moistureHumidityImage.png")}
                />
            </View>
        </ScrollView>
    );
}