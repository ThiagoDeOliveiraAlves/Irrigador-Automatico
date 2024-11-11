import React, { useEffect, useContext } from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native";
import {fetchAtualizar, fetchGetHistoricoIrrigacao} from "../../../API";
import { UmidadeContext, UmidadeProvider } from "../../../Services/Context";
import styles from "./style";



export default function Inicio(){

    
    
    /*
    const [umidadeMedia, setUmidadeMedia] = React.useState(0);
    const [bombaStatus, setBombaStatus] = React.useState(false);
    */

    let {umidadeMedia, bombaStatus, tentativas, alertMessage, isConnected, conectar} = useContext(UmidadeContext);


    const [errorMessage, setErrorMessage] = React.useState("");
    const [comunicationErrorQuant, setComunicationErrorQuant] = React.useState(0);
    
    const getUmidade = async () =>{
        try{
            conectar();



            //setErrorMessage("");

            /*
            setComunicationErrorQuant(0);

            const data = await fetchAtualizar();
            await fetchGetHistoricoIrrigacao();
            const dataArray = data.split(";");
            setUmidadeMedia(dataArray[0]);
            if(dataArray[1] == "1"){
                setBombaStatus(true);
            }
            else{
                setBombaStatus(false);
            }
            */
        }
        catch(error){
            setErrorMessage("Erro de comunicação");
        }
    }

    //solicita os níveis de umidade atuais 
    /*
    useEffect(() => {
        if (comunicationErrorQuant < 3) {
            const fetchData = async () => {
              try {
                const data = await fetchAtualizar();
                await fetchGetHistoricoIrrigacao();
                
                const dataArray = data.split(";");
                setUmidadeMedia(dataArray[0]);
                setBombaStatus(dataArray[1] === "1");
              } 
              catch (error) { 
                setComunicationErrorQuant((prev) => prev + 1);
                console.log("Erro de comunicação:", comunicationErrorQuant);
                setErrorMessage("Erro de comunicação");
              }
            };

            const intervalId = setInterval(fetchData, 2000);
            return () => clearInterval(intervalId);
        }
    }, [comunicationErrorQuant])
    */

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