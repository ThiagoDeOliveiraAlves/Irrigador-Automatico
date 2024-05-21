import React from "react";
import {View, ScrollView, Text, TouchableOpacity, TextInput} from "react-native";
import styles from "./style";
import {fetchGetHistoricoIrrigacao} from "../../../API";
import {salvarHistoricoIrrigacao, lerArquivo, apagarDados} from "../../../Services";

export default function(){

    const [dadoTeste, setDadoTeste] = React.useState(null);
    const [content, setContent] = React.useState("Teste: ");
    const [irrHist, setIrrHist] = React.useState("");

    const salvar = async () =>{
        const data = salvarHistoricoIrrigacao(dadoTeste);
        setDadoTeste(data);
    }
    const lerDoc = async () =>{
        const text = lerArquivo();
        setContent(text);
    }
    const getHistoricoIrrigacao = async () => {
        const data = fetchGetHistoricoIrrigacao();
        setIrrHist(data);
    }
    const apagar = async () =>{
        apagarDados();
    }
    return(
        <ScrollView >
            <View style={styles.view}>
                <Text style={styles.text}>Teste do banco de dados: </Text>
                    <TextInput style={styles.input}
                    onChangeText={setDadoTeste}
                    value={dadoTeste}
                    
                    />
                <TouchableOpacity style={styles.button}
                    onPress={(() => salvar())}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={(() => lerDoc())}
                >
                    <Text style={styles.buttonText}>Ler documento</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button}
                    onPress={(() => apagar())}
                >
                    <Text style={styles.buttonText}>Apagar dados</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Conteúdo do arquivo:</Text>
                <Text style={styles.text}>{content}</Text>
                
                <TouchableOpacity
                style={styles.button}
                onPress={(() => getHistoricoIrrigacao())}
                >
                    <Text style={styles.buttonText}>Get histórico Irrigação</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Histórico de irrigação:</Text>
                <Text style={styles.text}>{irrHist}</Text>
            </View>
        </ScrollView>
    )
}
