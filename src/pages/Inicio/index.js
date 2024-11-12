import React, { useEffect, useContext } from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native";
import {fetchAtualizar, fetchGetHistoricoIrrigacao} from "../../../API";
import { UmidadeContext, UmidadeProvider } from "../../../Services/Context";
import styles from "./style";

export default function Inicio(){

    let {umidadeMedia, bombaStatus, tentativas, alertMessage, isConnected, conectar} = useContext(UmidadeContext);


    const [errorMessage, setErrorMessage] = React.useState("");
    const [comunicationErrorQuant, setComunicationErrorQuant] = React.useState(0);
    
    const getUmidade = async () =>{
        try{
            conectar();
        }
        catch(error){
            setErrorMessage("Erro de comunicação");
        }
    }

    return(
        <View style={styles.view}>
            <UmidadeProvider>
            <Text style={styles.title}>Umidade Média</Text>
    
            <Text style={styles.umidadeMedia}>{umidadeMedia}%</Text>
            
            {bombaStatus?
            <Text style={styles.waterpumpText}>Estado da bomba: <Text style={styles.waterPumpOn}>Ligada</Text></Text>
            :
            <Text style={styles.waterpumpText}>Estado da bomba: <Text style={styles.waterPumpOff}>Desligada</Text></Text>
            }
            
            <TouchableOpacity
            disabled={isConnected}
            style={styles.button}
            onPress={getUmidade}
            >    
                <Text style={styles.buttonText}>Conectar</Text>
            </TouchableOpacity>

            {isConnected?
            <Text style={styles.greenText}>{alertMessage}</Text>
            :
            <Text style={styles.redText}>{alertMessage}</Text>
            }


            </UmidadeProvider>
        </View>
    );  
}