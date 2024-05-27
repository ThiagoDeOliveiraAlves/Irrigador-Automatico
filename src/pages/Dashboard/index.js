import React from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {gerarGrafico, getAllDataPeriod, dashboardIrrigationPeriod, dashboardIrrigationDate } from "../../../Services";
import styles from "./style";


export default function Dashboard(){

    const [startDate, setStartDate] = React.useState(0);
    const [endDate, setEndDate] = React.useState(0);
    const [format, setFormat] = React.useState("");

    const formatStartDate = (text) =>{
        let formatedDate = text.replace(/\D/g, '');

        if(formatedDate.length <= 2){
            formatedDate = formatedDate.replace(/^(\d{0,2})/, "$1");
        }
        else if(formatedDate.length <=4){
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})/, "$1/$2");
        }
        else{
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, "$1/$2/$3").slice(0, 10);
        }

        setStartDate(formatedDate);
    }
    const formatEndDate = (text) =>{
        let formatedDate = text.replace(/\D/g, '');

        if(formatedDate.length <= 2){
            formatedDate = formatedDate.replace(/^(\d{0,2})/, "$1");
        }
        else if(formatedDate.length <=4){
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})/, "$1/$2");
        }
        else{
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, "$1/$2/$3").slice(0, 10);
        }

        setEndDate(formatedDate);
    }

    const genDashboard = async () =>{
        console.log("---------------------------");
        const sDate = startDate.replaceAll("/", "");
        const eDate = endDate.replaceAll("/", "");
        console.log(sDate);
        console.log(eDate);
        const arr = await getAllDataPeriod(sDate, eDate);
        const dateArr = dashboardIrrigationDate(arr, "weeks");
        console.log("--CONTEÚDO DO VETOR TESTE--");
        for(let i = 0; i<dateArr.length; i++){
            console.log(dateArr[i]);
        }
    }

    return(
        <View style={styles.view}>
            <Text style={styles.title}>DashBoard</Text>
            <View style={styles.box}>
                <View style={styles.container}>
                    <Text style={styles.periodText}>Período:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={formatStartDate}
                        value={startDate}
                        placeholder="dd/MM/yyyy"
                        keyboardType="numeric"
                        maxLength={10}
                    />
                    <Text style={styles.text}>-</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={formatEndDate}
                        value={endDate}
                        placeholder="dd/MM/yyyy"
                        keyboardType="numeric"
                        maxLength={10}
                    />
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={genDashboard}
                >
                    <Text style={styles.buttonText}>Gerar gráfico</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}