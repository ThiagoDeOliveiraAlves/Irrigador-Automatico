import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#161617",
    },
    
    title:{
        marginTop: 20,
        fontSize: 24,
        color: "#00A038",
    },

    umidadeMedia:{
        marginTop: 20,
        fontSize: 75,
        color: "#00A038",
    },

    waterpumpText:{
        marginTop: 40,
        color: "white",
        fontSize: 20,
    },
    waterPumpOn:{
        color: "#3cfa02",
    },

    waterPumpOff:{
        color: "red",
    },

    button:{
        marginTop: 20,
        width: 140,
        height: 55,
        backgroundColor: "blue",
        borderRadius: 100, 
    },
    buttonText:{
        color: "white",
        fontSize: 24,
        textAlign: "center",
        padding: 10,
    },
    
    umidadeSensorText:{
        marginTop: 50,
        fontSize: 25,
        color: "white",
    },

    exemploNum:{
        color: "#0ff586"
        //#0f86f5
    },
    exemplo:{
        marginTop: 20,
        fontSize: 22,
        color: "white",
        borderWidth: 1,
        borderColor: "white",
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
    },
    exemplo1:{
        fontSize: 22,
        color: "white",
        borderWidth: 1,
        borderColor: "white",
        paddingHorizontal: 40,
        paddingVertical: 10,
    },

    exemplo2:{
        fontSize: 22,
        color: "white",
        borderWidth: 1,
        borderColor: "white",
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

});

export default styles;