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
    greenText:{
        marginTop: 20,
        color: "#3cfa02",
        fontSize: 20,
    },

    redText:{
        marginTop: 20,
        color: "red",
        fontSize: 19,
    },
    button:{
        marginTop: 20,
        backgroundColor: "blue",
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
        width: 200,
        paddingHorizontal: 5,
        textAlign: "center",
        borderRadius: 10,
    },
});

export default styles;