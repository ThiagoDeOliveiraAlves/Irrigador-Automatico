import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    view:{
        flex: 1,
        height: 1000,
        alignItems: "center",
        backgroundColor: "#161617",
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
})

export default styles;