import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { gerarGrafico, getAllDataPeriod, dashboardIrrigationPeriod, dashboardIrrigationDate, calcWaterLiters, calcKWH } from "../../../Services";
import styles from "./style";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import Animated, { useAnimatedProps, SharedValue } from "react-native-reanimated";
import { useFont } from "@shopify/react-native-skia";

export default function Dashboard() {

    const [startDate, setStartDate] = React.useState(0);
    const [endDate, setEndDate] = React.useState(0);
    const [format, setFormat] = React.useState("daily");
    const [editable, setEditable] = React.useState(true);

    const [litrosAgua, setLitrosAgua] = React.useState([]);
    const [Kwh, setKwh] = React.useState([]);
    const [date, setDate] = React.useState([]);

    //let data = litrosAgua.map((litro, index) => ({ x: date[index], y: litro }));

    let data = date.map((day, index) => ({
        day,
        litros: litrosAgua[index]
    }));

    let data2 = date.map((day, index) => ({
        day,
        kwh: Kwh[index]
    }));

    //fonte usada para exibir os labels do gráfico
    const font = useFont(require("../../fonts/Roboto-Regular.ttf"));

    const { state, isActive } = useChartPressState({ x: 0, y: { litros: 0 } });
    const { state: state2, isActive: isActive2 } = useChartPressState({ x: 0, y: { kwh: 0 } });

    const animatedLitrosAguaText = useAnimatedProps(() => {
        console.log("Chamou");
        return {
            text: `${state.y.litros.value.value.toFixed(2)}L`,
            defaultValue: "",
        }
    })
    const animatedDateText = useAnimatedProps(() => {
        return {
            text: `${state.x.value.value}`,
            defaultValue: "",
        }
    })

    const animatedDateText2 = useAnimatedProps(() => {
        return {
            text: state2 && state2.x && state2.x.value ? `${state2.x.value.value}` : "",
            defaultValue: "",
        }
    })
    
    const animatedKwhText = useAnimatedProps(() => {
        console.log("Chamou2");
        return {
            text: state2 && state2.y && state2.y.kwh && state2.y.kwh.value ? `${state2.y.kwh.value.value}Kw` : "",
            defaultValue: "",
        }
    })
    
    Animated.addWhitelistedNativeProps({ text: true });

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

    const formatStartDate = (text) => {
        let formatedDate = text.replace(/\D/g, '');

        if (formatedDate.length <= 2) {
            formatedDate = formatedDate.replace(/^(\d{0,2})/, "$1");
        }
        else if (formatedDate.length <= 4) {
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})/, "$1/$2");
        }
        else {
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, "$1/$2/$3").slice(0, 10);
        }

        setStartDate(formatedDate);
    }
    const formatEndDate = (text) => {
        let formatedDate = text.replace(/\D/g, '');

        if (formatedDate.length <= 2) {
            formatedDate = formatedDate.replace(/^(\d{0,2})/, "$1");
        }
        else if (formatedDate.length <= 4) {
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})/, "$1/$2");
        }
        else {
            formatedDate = formatedDate.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, "$1/$2/$3").slice(0, 10);
        }

        setEndDate(formatedDate);
    }
    //Gerar gráficos
    const genDashboard = async () => {
        console.log("---------------------------");
        console.log("format: " + format);
        if(format == "daily"){
            setEndDate(startDate);
        }
        const sDate = startDate.replaceAll("/", "");
        const eDate = endDate.replaceAll("/", "");
        
        console.log(sDate);
        console.log(eDate);
        const arr = await getAllDataPeriod(sDate, eDate);
        console.log("Teste do getAllDataPeriod");
        for (let i = 0; i < arr.length; i++) {
            console.log(i + " " + arr[i]);
        }

        /*
        //ATENÇÃO: A FUNÇÃO dashboardIrrigationDate DEVE SER EXECUTADA SEMPRE ANTES DA dashboardIrrigationPeriod, POIS ESSA ÚLTIMA MODIFICA O VETOR arr
        const dateArr = dashboardIrrigationDate(arr, format);
        const periodArr = dashboardIrrigationPeriod(arr, format);
        const litrosDeAgua = await calcWaterLiters(periodArr); 
        const kwhArr = await calcKWH(periodArr);
        dateArr.push("-");
        litrosAgua.push("-");
        kwhArr.push("-");

        setLitrosAgua(litrosDeAgua);
        setDate(dateArr);
        setKwh(kwhArr);
        */
    }

    const formatDate = (date) => {
        if (typeof date === 'string') {
            const parts = date.split("-");
            if (parts.length === 2) {
                return `${parts[0]}\n${parts[1]}`;
            }
        }
        return date;
    };

    //serve para definir uma largura para o gráfico de acordo com a quantidade de dados
    const calculateChartWidth = () => {
        const minWidth = 400;
        if(format == "days"){
            const additionalWidthPerData = 50;
            return minWidth + (data.length * additionalWidthPerData);
        }
        const additionalWidthPerData = 70;
        return minWidth + (data.length * additionalWidthPerData);
    };

    //serve para definir o valor tockcount dos gráficos
    const calculateTickCountX = () => {
        console.log("TickCount: " + data.length);
        return data.length - 1;
    }


    //teste
    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        highTmp: 40 + 30 * Math.random(),
    }));

    return (
        <ScrollView style={{ backgroundColor: "#161617" }}>
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
                    <View style={styles.container}>
                        <Text style={styles.periodText}>Formato:               </Text>
                        <Picker
                        style={styles.picker}
                            selectedValue={format}
                            onValueChange={(itemValue, itemIndex) =>
                                setFormat(itemValue)
                            }
                        >
                            <Picker.Item label="diário" value="daily" />
                            <Picker.Item label="dias" value="days" />
                            <Picker.Item label="semanas" value="weeks" />
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={genDashboard}
                    >
                        <Text style={styles.buttonText}>Gerar gráfico</Text>
                    </TouchableOpacity>
                </View>
            </View>
                <View style={styles.viewPoints}>
                    {isActive && (
                        <View>
                            <AnimatedTextInput
                                editable={false}
                                underlineColorAndroid={"transparent"}
                                style={styles.waterChartDataText}
                                animatedProps={animatedLitrosAguaText}
                            />
                            <AnimatedTextInput
                                editable={false}
                                underlineColorAndroid={"transparent"}
                                style={styles.dateChartDataText}
                                animatedProps={animatedDateText}
                            />
                        </View>
                    )}
                </View>
                {litrosAgua.length > 0 && date.length > 0 && (
                    <ScrollView horizontal style={{ marginRight: 20 }}>
                        <View style={{ width: calculateChartWidth(), height: 300, marginLeft: 20 }}>
                            <CartesianChart
                                data={data}
                                xKey="day"
                                yKeys={["litros"]}
                                chartPressState={state}
                                axisOptions={{
                                    tickCount: {
                                        y: 5,
                                        x: calculateTickCountX()
                                    },
                                    font: font,
                                    labelOffset: { x: 5, y: 20 },
                                    labelPosition: "outset",
                                    labelColor: "white",
                                    lineColor: "gray",
                                }}
                            >
                                {({ points }) => (
                                    <>
                                        <Line points={points.litros} color="#31c2c4" strokeWidth={3} />
                                    </>
                                )}
                            </CartesianChart>
                        </View>
                    </ScrollView>
                )}

                <View style={styles.viewPoints}>
                    {isActive2 &&(
                        <View>
                            <AnimatedTextInput
                                editable={false}
                                underlineColorAndroid={"transparent"}
                                style={styles.khwChartDataText}
                                animatedProps={animatedKwhText}
                            />
                            <AnimatedTextInput
                                editable={false}
                                underlineColorAndroid={"transparent"}
                                style={styles.dateChartDataText}
                                animatedProps={animatedDateText2}
                            />
                        </View>
                    )}
                </View>
                {litrosAgua.length > 0 && date.length > 0 && (
                    <ScrollView horizontal style={{marginBottom: 30}}>
                        <View style={{ width: calculateChartWidth(), height: 300, marginLeft: 10 }}>
                            <CartesianChart
                                data={data2}
                                xKey="day"
                                yKeys={["kwh"]}
                                chartPressState={state2}
                                axisOptions={{
                                    tickCount: {
                                        y: 5,
                                        x: calculateTickCountX()
                                    },
                                    font: font,
                                    labelOffset: { x: 5, y: 4 },
                                    labelPosition: "outset",
                                    labelColor: "white",
                                    lineColor: "gray"
                                }}
                            >
                                {({ points }) => (
                                    <>
                                        <Line points={points.kwh} color="yellow" strokeWidth={3} />
                                    </>
                                )}
                            </CartesianChart>
                        </View>
                    </ScrollView>
                )}
            
        </ScrollView>
    );
}
