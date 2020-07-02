import { StyleSheet } from "react-native"

export default StyleSheet.create({
    screen: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
    },
    screenCenter: {
        justifyContent: 'center',
        width: '100%'
    },
    container: {
        backgroundColor: '#ffffff',
    },
    containerCenter: {
        flexDirection: 'row',
    },
    title: {
        
    },
    card: {
        borderColor: '#bdbdbd',
        borderWidth: 0.25,
        borderRadius: 12,
        elevation: 0,
    },
    spacer: {
        marginBottom: 12
    },
    cardActionsRight: {
        justifyContent: 'space-between',
    },
    appBar: {
        backgroundColor: '#FFFFFF',
    },
    inputText: {
        backgroundColor: '#ffffff',
    },
    errorText: {
        color: '#ff5252',
    },
    successText: {
        color: '#7cb342',
    },
    normalText: {
        color: '#000000',
    },
    defaultPaddingHorizontal: {
        paddingLeft: 12,
        paddingRight: 12,
    },
    defaultPaddingVertical: {
        paddingTop: 12,
        paddingBottom: 12,
    },
    defaultHalfPaddingHorizontal: {
        paddingLeft: 6,
        paddingRight: 6,
    },
    defaultHalfPaddingVertical: {
        paddingTop: 6,
        paddingBottom: 6,
    },
    defaultMarginHorizontal: {
        marginLeft: 12,
        marginRight: 12,
    },
    defaultMarginVertical: {
        marginTop: 12,
        marginBottom: 12,
    },
    fab: {
        position: 'absolute',
        margin: 12,
        right: 0,
        bottom: 0,
    },
})