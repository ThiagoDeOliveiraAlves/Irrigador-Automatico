import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#161617",
        paddingBottom: 60,
    },
    box:{
        marginTop: 20,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
    },

    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        alignContent: "center",
    },
    container1:{
        flexDirection: "column",
        marginVertical: 5,
        alignContent: "center",
    },
    
    title:{
        marginTop: 20,
        fontSize: 24,
        color: "#00A038",
    },
    lightBlueTitle:{
        marginTop: 2,
        fontSize: 20,
        color: "lightblue",
    },
    text:{
        marginTop: 5,
        fontSize: 20,
        color: "white",
    },
    
    umidityText:{
    
        fontSize: 20,
        color: "#00A038",
    },
    dangerText:{
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        fontSize: 18,
        color: "#cf0404",
        textAlign: "center",
    },
    boxText:{
        marginTop: 10,
        marginRight: 10,
        fontSize: 20,
        color: "white",
    },
    statusMessage:{
        marginTop: 20,
        fontSize: 20,
        color: "purple",
    },
    alertMessage:{
        marginTop: 20,
        fontSize: 20,
        color: "red",
    },
    waterpumpText:{
        marginTop: 40,
        color: "white",
        fontSize: 20,
    },
    greenText:{
        color: "#3cfa02",
        fontSize: 20,
    },

    redText:{
        color: "red",
        fontSize: 19,
    },
    button:{
        marginTop: 20,
        backgroundColor: "blue",
        borderRadius: 20,
        zIndex: 2,
    },
    redButton:{
        marginTop: 20,
        backgroundColor: "darkred",
        borderRadius: 20,
        zIndex: 2,
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