import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
const s = StyleSheet.create({
    main: {
        backgroundColor: "#F46413",
        padding: 18,
        borderRadius: 14,
    },
    text: {
        textAlign: "center",
        fontFamily: "Noto Sans KR",
        fontWeight: "500",
        lineHeight: 20,
        color: "#fff",
        fontSize: 16
    },
    footer: {
        paddingTop: 8,
        textAlign: "center",
        fontSize: 12,
        color: "#737373",
        fontFamily: "Noto Sans KR",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: 14,
    }
})
const Tbutton = (props) => {
    return (
        <>
            <TouchableOpacity onPress={() => alert("asdf")} style={s.main} >
                <Text style={s.text}> {props.children}</Text>
            </TouchableOpacity>
            {props.footer ? <Text style={s.footer}>{props.footer}</Text> : <></>}

        </>
    );
};

export default Tbutton;