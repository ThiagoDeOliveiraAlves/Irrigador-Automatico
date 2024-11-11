import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    view:{
        flex: 1,
        height: 1000,
        alignItems: "center",
        backgroundColor: "#161617",
    },
    title:{
        marginTop: 20,
        fontSize: 28,
        color: "#00A038",
        marginBottom: 30,
    },
    box:{
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 30,
        zIndex: 3,

    },
    text:{
        marginTop: 20,
        fontSize: 18,
        color: "white",
    },
    greenText:{
        marginTop: 20,
        fontSize: 18,
        color: "lightgreen",
    },
    redText:{
        marginTop: 20,
        fontSize: 18,
        color: "red",
    },
    
    input:{
        marginTop: 10,
        fontSize: 18,
        color: "white",
        padding: 5,
        height: 30,
        width: 220,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        backgroundColor: "#262625",
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
    image:{
        position: "absolute",
        marginTop: 250,
        resizeMode: "contain",
        width: 300,
        zIndex: 1,
    }
});

export default styles;