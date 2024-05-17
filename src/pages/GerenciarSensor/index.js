import React from "react";
import{View, Text, TouchableOpacity} from "react-native";
import styles from "./style"
import { useNavigation } from "@react-navigation/native";


export default function GerenciarSensor(){
    return(

        <View style={styles.view}>
            <Text style={styles.title}>Gerenciar sensores</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Adicionar sensor</Text>
            </TouchableOpacity>

            <Text style={styles.title2}>Sensores</Text>

            <Text style={styles.exemplo}>Sensor 1   | <Text style={styles.excluir}>Excluir</Text></Text>
            <Text style={styles.exemplo1}>Sensor 2   | <Text style={styles.excluir}>Excluir</Text></Text>
            <Text style={styles.exemplo1}>Sensor 3   | <Text style={styles.excluir}>Excluir</Text></Text>
            <Text style={styles.exemplo2}>Sensor 4   | <Text style={styles.excluir}>Excluir</Text></Text>
        </View>
    );
}