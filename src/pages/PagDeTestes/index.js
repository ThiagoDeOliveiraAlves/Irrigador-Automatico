import React from "react";
import {View, ScrollView, Text, TouchableOpacity, TextInput} from "react-native";
import styles from "./style";
import {fetchGetHistoricoIrrigacao} from "../../../API";
import {saveIrrigationHistory, deleteAllIrrigationData, calcPeriod, getWaterPumpData, getIrrigationData, 
    deleteAllWPData, getCurrentWPData, getCurrentWPId, getCurrentWPFlowRate, getCurrentWPPower, getHumidityLevels,
    getAllDataPeriod, getRegId, getRegDate, getRegPeriod} from "../../../Services";

export default function(){
    //usadas para lidar com os níveis de umidade
    const[humiditylevels, setHumidityLevels] = React.useState("");

    //usadas para lidar com os dados da bomba de agua
    const[currentWPData, setCurrentWPData] = React.useState("");
    const[currentWPId, setCurrentWPId] = React.useState("");
    const[currentWPFlowRate, setCurrentWPFlowRate] = React.useState("");
    const[currentWPPower, setCurrentWPPower] = React.useState("");
    const[waterPumpData, setWaterPumpData] = React.useState("");

    //usadas para lidar com os registros de irrigacoes:
    const [dadoTeste, setDadoTeste] = React.useState(null);
    const [content, setContent] = React.useState("");
    const [irrHist, setIrrHist] = React.useState("");
    const [irrReg, setIrrReg] = React.useState("");
    const [irrRegId, setIrrRegId] = React.useState("");
    const [irrRegDate, setIrrRegDate] = React.useState("");
    const [irrRegPeriod, setIrrRegPeriod] = React.useState("");

    //usadas para lidar com os calculos
    const[startAndEndDate, setStartAndEndDate] = React.useState("");
    const [time, setTime] = React.useState("");

    ////////////////Niveis de Umidade//////////////////
    const getHumidity = async() =>{
        let aux = await getHumidityLevels();
        setHumidityLevels(aux);
    }

    ////////////////Dados da Bomba de Agua//////////////////
    const salvarWPData = async(newWPData) =>{
        setWaterPumpData(newWPData);
    }
    
    const getCurrentWP = async() =>{
        let aux = await getCurrentWPData();
        setCurrentWPData(aux);
    }

    const getCurrentWPID = async() =>{
        let aux = await getCurrentWPId();
        setCurrentWPId(aux);
    }

    const getCurrentWPFlowrate = async() =>{
        setCurrentWPFlowRate(getCurrentWPFlowRate());
    }

    const getCurrentWPpower = async() =>{
        setCurrentWPPower(getCurrentWPPower());
    }

    const getWPData = async() =>{
        setWaterPumpData(getWaterPumpData());
    }

    const deleteWPData = async() =>{
        deleteAllWPData();
    }

    ////////////////Registro de Irrigacoes//////////////////
    const salvar = async () =>{
        const data = saveIrrigationHistory(dadoTeste);
        setDadoTeste(data);
    }
    const lerIrrigationData = async () =>{
        const text = getIrrigationData();
        setContent(text);
    }
    const fetchGetHistoricoIrrig = async () => {
        const data = fetchGetHistoricoIrrigacao();
        setIrrHist(data);
    }
    const apagar = async () =>{
        deleteAllIrrigationData();
    }

    const regId = async() =>{
        let aux = getRegId(irrReg);
        setIrrRegId(aux);
    }
    const regDate = async() =>{
        let aux = getRegDate(irrReg);
        setIrrRegDate(aux);
    }
    const regPeriod = async() =>{
        let aux = getRegPeriod(irrReg);
        setIrrRegPeriod(aux);
    }
    

    ////////////////Calculos//////////////////
    const getAlldataPeriodTest = async() =>{
        let data = startAndEndDate.split("-");
        getAllDataPeriod(data[0], data[1]);
    }

    const calcPeriodo = () =>{
        calcPeriod(time);
    }
    return(
        <ScrollView >
            <View style={styles.view}>

                <Text style={styles.title}>Níveis de umidade: </Text>

                <TouchableOpacity style={styles.blueButton}
                    onPress={(() => getHumidity())}
                >
                    <Text style={styles.buttonText}>Ver umidade min-max</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Níveis de umidade: </Text>
                <Text style={styles.text}>{humiditylevels}</Text>


                <Text style={styles.text}>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</Text>


                <Text style={styles.title}>Bomba de água: </Text>

                <TouchableOpacity style={styles.blueButton}
                    onPress={(() => getWPData())}
                >
                    <Text style={styles.buttonText}>Ler WaterPumpData.txt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.redButton}
                    onPress={(() => deleteWPData())}
                >
                    <Text style={styles.buttonText}>Apagar dados</Text>
                </TouchableOpacity>

                <Text style={styles.text}>WaterPumpData.txt: </Text>

                <Text style={styles.text}>{waterPumpData}</Text>

                <TouchableOpacity style={styles.blueButton}
                    onPress={(() => getCurrentWP())}
                >
                    <Text style={styles.buttonText}>getCurrentWPData</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Current WP Data:</Text>
                <Text style={styles.text}>{currentWPData}</Text>

                <TouchableOpacity style={styles.blueButton}
                    onPress={(() => getCurrentWPID())}
                >
                    <Text style={styles.buttonText}>getCurrentWPId</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Current WP ID:</Text>
                <Text style={styles.text}>{currentWPId}</Text>

                <TouchableOpacity style={styles.blueButton}
                    onPress={(() => getCurrentWPFlowrate())}
                >
                    <Text style={styles.buttonText}>getCurrentWPFlowRate</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Current WP Flow Rate:</Text>
                <Text style={styles.text}>{currentWPFlowRate}</Text>

                <TouchableOpacity style={styles.blueButton}
                    onPress={(() => getCurrentWPpower())}
                >
                    <Text style={styles.buttonText}>getCurrentWPPower</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Current WP Power:</Text>
                <Text style={styles.text}>{currentWPPower}</Text>

                    <Text style={styles.text}>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</Text>

                <Text style={styles.title}>Histórico de Irrigações: </Text>
                
                <Text style={styles.text}>IrrigationData.txt: </Text>
                    <TextInput style={styles.input}
                    onChangeText={setDadoTeste}
                    value={dadoTeste}
                    
                    />
                <TouchableOpacity style={styles.greenButton}
                    onPress={(() => salvar())}
                >
                    <Text style={styles.buttonText}>Salvar his. de irrig.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.greenButton}
                    onPress={(() => lerIrrigationData())}
                >
                    <Text style={styles.buttonText}>Ler IrrigationData.txt</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.redButton}
                    onPress={(() => apagar())}
                >
                    <Text style={styles.buttonText}>Apagar dados IrrigationData.txt</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Conteúdo do IrrigationData.txt:</Text>
                <Text style={styles.text}>{content}</Text>
                
                <TouchableOpacity
                style={styles.greenButton}
                onPress={(() => fetchGetHistoricoIrrig())}
                >
                    <Text style={styles.buttonText}>Get ESP8266 irrigation data</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Irrigation data from ESP8266:</Text>
                <Text style={styles.text}>{irrHist}</Text>

                <Text style={styles.text}>Registro (id data inicio-fim)</Text>
                <TextInput style={styles.input}
                    onChangeText={setIrrReg}
                    value={irrReg}
                />

                <TouchableOpacity
                style={styles.greenButton}
                onPress={(() => regId())}
                >
                    <Text style={styles.buttonText}>Get reg Id</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Reg Id:</Text>
                <Text style={styles.text}>{irrRegId}</Text>

                <TouchableOpacity
                style={styles.greenButton}
                onPress={(() => regDate())}
                >
                    <Text style={styles.buttonText}>Get reg Date</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Reg Date:</Text>
                <Text style={styles.text}>{irrRegDate}</Text>

                <TouchableOpacity
                style={styles.greenButton}
                onPress={(() => regPeriod())}
                >
                    <Text style={styles.buttonText}>Get reg Period</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Reg Period:</Text>
                <Text style={styles.text}>{irrRegPeriod}</Text>

                <Text style={styles.text}>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</Text>

                <Text style={styles.title}>Cálculos: </Text>

                <Text style={styles.text}>Calcular período </Text>
                    <TextInput style={styles.input}
                    onChangeText={setTime}
                    value={time}
                    
                    />
                <TouchableOpacity style={styles.orangeButton}
                    onPress={(() => calcPeriodo())}
                >
                    <Text style={styles.buttonText}>Calcular período</Text>
                </TouchableOpacity>


                <Text style={styles.text}>Data de Inicio e Fim</Text>
                <Text style={styles.text}>(ddMMyyyy-ddMMyyyy)</Text>
                <TextInput style={styles.input}
                    onChangeText={setStartAndEndDate}
                    value={startAndEndDate}
                />

                <TouchableOpacity style={styles.orangeButton}
                    onPress={(() => getAlldataPeriodTest())}
                >
                    <Text style={styles.buttonText}>getAllDataPeriod</Text>
                </TouchableOpacity>

                <Text style={styles.text}>|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</Text>

            </View>
        </ScrollView>
    )
}
