import React from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native";
import {fetchAtualizar, fetchGetHistoricoIrrigacao} from "../../../API";
import styles from "./style";



export default function Inicio(){
    
    const [umidadeMedia, setUmidadeMedia] = React.useState(0);
    const [bombaStatus, setBombaStatus] = React.useState(false);
    
    const getUmidade = async () =>{
        const data = await fetchAtualizar()
        const dataArray = data.split(";");
        setUmidadeMedia(dataArray[0]);
        if(dataArray[1] == "1"){
            setBombaStatus(true);
        }
        else{
            setBombaStatus(false);
        }
    }

    return(
        <View style={styles.view}>
            <Text style={styles.title}>Umidade Média</Text>
    
            <Text style={styles.umidadeMedia}>{umidadeMedia}%</Text>
            {bombaStatus?
            <Text style={styles.waterpumpText}>Estado da bomba: <Text style={styles.waterPumpOn}>Ligada</Text></Text>
            :
            <Text style={styles.waterpumpText}>Estado da bomba: <Text style={styles.waterPumpOff}>Desligada</Text></Text>
            }
            <TouchableOpacity
            style={styles.button}
            onPress={getUmidade}
            >
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <Text style={styles.umidadeSensorText}>Umidade por sensor</Text>

            <Text style={styles.exemplo}>Sensor 1:  <Text style={styles.exemploNum}>57%</Text></Text>
            <Text style={styles.exemplo1}>Sensor 2:  <Text style={styles.exemploNum}>56%</Text></Text>
            <Text style={styles.exemplo1}>Sensor 3:  <Text style={styles.exemploNum}>58%</Text></Text>
            <Text style={styles.exemplo2}>Sensor 4:  <Text style={styles.exemploNum}>57%</Text></Text>

            
            <FlatList>
                
            </FlatList>
        </View>
    );  
}