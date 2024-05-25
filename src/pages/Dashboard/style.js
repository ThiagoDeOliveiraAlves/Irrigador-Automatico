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