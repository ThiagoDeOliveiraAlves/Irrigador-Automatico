import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#161617",
    },
    box:{
        marginTop: 20,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        paddingHorizontal: 20,
        alignItems: "center",
    },

    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        alignContent: "center",
    },
    picker:{
        backgroundColor: "white",
        width: 150,
        height: 10,
    },
    viewPoints:{
        height: 20,
        marginLeft: 40,
        flexDirection: "row",
        marginVertical: 30,
    },
    waterChartDataText:{
        color: "#31c2c4",
        fontSize: 18, 
        fontWeight: "bold",
        marginHorizontal: 5,
    },
    dateChartDataText:{
        color: "#9bb1bf",
        fontSize: 18, 
        fontWeight: "bold",
        marginHorizontal: 5,
    },

    khwChartDataText:{
        color: "yellow",
        fontSize: 18, 
        fontWeight: "bold",
        marginHorizontal: 5,
    },
    title:{
        marginTop: 20,
        fontSize: 24,
        color: "#00A038",
    },
    text:{
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        color: "white",
    },
    periodText:{
        marginTop: 10,
        marginRight: 10,
        fontSize: 20,
        color: "white",
    },
    button:{
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: "blue",
        borderRadius: 20,
        textAlign: "center",
    },
    buttonText:{
        color: "white",
        fontSize: 20,
        paddingHorizontal: 60,
        paddingVertical: 8,
    },
    input:{
        backgroundColor: "white",
        marginTop: 5,
        fontSize: 15,
        height: 40,
        width: 100,
        paddingHorizontal: 5,
        textAlign: "center",

        borderRadius: 10,

    },
});

export default styles;