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
    text:{
        marginTop: 20,
        fontSize: 18,
        color: "white",
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
});

export default styles;