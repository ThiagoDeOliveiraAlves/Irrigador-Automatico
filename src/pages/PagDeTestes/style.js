import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    view:{
        flex: 1,
        height: "100%",
        alignItems: "center",
        backgroundColor: "#161617",
    },
    title:{
        marginTop: 20,
        fontSize: 24,
        color: "white",
        fontWeight: "800"
    },
    text:{
        marginTop: 20,
        fontSize: 18,
        color: "white",
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
    blueButton:{
        marginTop: 20,
        backgroundColor: "blue",
        borderRadius: 20,
        zIndex: 2,
    },
    greenButton:{
        marginTop: 20,
        backgroundColor: "darkgreen",
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
})

export default styles;