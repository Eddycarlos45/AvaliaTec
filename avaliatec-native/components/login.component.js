import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native';
import styles from '../assets/stylesheet/Custom'
import axios from 'axios';

const proxy = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/login'

export const LoginScreen = ({ navigation }) => {

    const [authEmail, setAuthEmail] = React.useState('');
    const [authPassword, setAuthPassword] = React.useState('');
    const [authStatus, setAuthStatus] = React.useState('false');
    const [firstRun, setFirstRun] = React.useState('true');

    // CHECK AUTHENTICATION
    handleAuthentication = async () => {
        try {
            if (await AsyncStorage.getItem('USER') != null) {
                // AUTHENTICATION DETECTED
                console.log('AUTHENTICATION DETECTED, REDIRECTING...')
                setAuthStatus('true')
                // navigation.dispatch(
                //     StackActions.replace('Home')
                // );
                // navigation.push('Home')
            } else {
                // AUTHENTICATION NOT DETECTED
                console.log('AUTHENTICATION NOT DETECTED, THERE\'S NOTHING TO DO...')
                setAuthStatus('false')
                // navigation.dispatch(
                //     StackActions.replace('Login')
                // );
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // SAVE AUTHENTICATION
    saveAuthentication = async () => {
        try {
            await AsyncStorage.setItem('USER', authEmail)
        } catch (error) {
            console.log(error.message);
        }
    }

    // const signIn = async () => {
    //     try {
    //         await AsyncStorage.setItem('USER', authEmail);
    //         handleAuthentication()
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    handleSubmit = (event) => {
        // event.preventDefault();
        // this.setState({
        //     loading: true
        // });
        const userData = {
            email: authEmail,
            password: authPassword
        }

        axios.post(proxy, userData)
            .then(res => {
                console.log('LOGIN SUCCESS')
                saveAuthentication()
                handleAuthentication()
            })
            .catch(err => {
                // this.setState({
                //     errors: err.response.data,
                //     loading: false
                // })
                console.log('LOGIN FAIL')
            })
    }

    // // ON APP START
    // (async function () {
    //     if (firstRun == 'true') {
    //         setFirstRun('false')
    //         handleAuthentication()
    //     }
    // })();

    return (
        <View style={styles.middle}>
            <View style={{ width: '100%' }}>
                <Card style={styles.defaultMarginHorizontal}>
                    <Card.Content>
                        <Title>Acesso</Title>
                        <TextInput
                            style={styles.marginBottom}
                            label='E-mail'
                            value={authEmail}
                            onChangeText={value => setAuthEmail(value)}
                        />
                        <TextInput
                            label='Password'
                            value={authPassword}
                            onChangeText={value => setAuthPassword(value)}
                        />
                    </Card.Content>
                    <Card.Actions
                        style={{ justifyContent: 'flex-end' }}
                    >
                        <Button
                            style={styles.marginRight}
                            mode="text"
                            onPress={() => console.log('NOT IMPLEMENTED')}>
                            Esquecí a senha
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => handleSubmit()}>
                            Acessar
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        </View>
    )
}
