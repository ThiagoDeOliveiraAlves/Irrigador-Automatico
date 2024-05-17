import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#161617",

    },
    title:{
        marginTop: 20,
        fontSize: 28,
        color: "#00A038",
    },
    button:{
        marginTop: 20,
        width: 250,
        height: 50,
        backgroundColor: "blue",
        borderRadius: 100, 
        
    },

    buttonText:{
        color: "white",
        fontSize: 18,
        textAlign: "center",
        padding: 12
    },

    title2:{
        marginTop: 60,
        fontSize: 28,
        color: "white",
    },

    excluir:{
        fontSize: 18,
        fontWeight: "300",
        color: "red"
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

})

export default styles;