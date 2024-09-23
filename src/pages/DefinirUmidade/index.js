import React, { useEffect} from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./style";
import { TextInput } from "react-native-gesture-handler";
import { fetchDefinirNiveisUmidade } from "../../../API";
import { salvarNiveisUmidade, getHumidityLevels } from "../../../Services";

export default function DefinirUmidade() {
    const [umidadeOn, setUmidadeOn] = React.useState(null);
    const [umidadeOff, setUmidadeOff] = React.useState(null);

    const getData = async () => {
        let data = await getHumidityLevels();
        let aux = data.split("-");
        setUmidadeOn(aux[0]);
        setUmidadeOff(aux[1]);
    }

    const sendData = async () => {
        console.log("sendData was called");
        const data = (umidadeOn + ";" + umidadeOff);
        fetchDefinirNiveisUmidade(data);
        salvarNiveisUmidade(umidadeOn, umidadeOff);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ScrollView>
            
            <View style={styles.view}>
                <Text style={styles.title}>Definir níveis de umidade</Text>
                <View style={styles.box}>
                    <Text style={styles.text}>Umidade mínima do solo: </Text>
                    <TextInput style={styles.input}
                        onChangeText={setUmidadeOn}
                        value={umidadeOn}
                        keyboardType="numeric"
                    />

                    <Text style={styles.text}>Umidade máxima do solo: </Text>
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

                <Image
                    style={styles.image}
                    source={require("../../../assets/moistureHumidityImage.png")}
                />
            </View>
        </ScrollView>
    );
}