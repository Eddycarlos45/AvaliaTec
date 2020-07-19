import * as React from 'react';
import { View, ScrollView, Text } from 'react-native'
import { TextInput, Button, Card, Divider, FAB } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import styles from '../assets/stylesheet/General'
import axios from 'axios';

const axiosSignIn = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/login'
const axiosGetUsers = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/users'
const axiosRequestNewPassword = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/resetPassword'

const strings = {
    appName: 'Avaliatec',
    signInTitle: 'Entre na sua conta',
    signInEmail: 'E-mail',
    signInPassword: 'Senha',
    signIn: 'Entrar',
    signingIn: 'Entrando',
    signInFail: 'E-mail ou senha incorretos',
    requestNewPasswordTitle: 'Solicite uma nova senha',
    requestNewPasswordEmail: 'E-mail da sua conta',
    requestNewPassword: 'Solicitar',
    requestingNewPassword: 'Solicitando',
    requestNewPasswordSuccess: 'Instruções encaminhadas',
    requestNewPasswordFail: 'Nenhuma conta encontrada',
}

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: null,
            signInPassword: null,
            signInStatus: null,
            requestNewPasswordEmail: null,
            requestNewPasswordStatus: -1,
            signInLoading: false,
            requestNewPasswordLoading: false,
            users: [],
            firstRun: true,
            authStatus: false,
            screen: true
        };
    }

    // SAVE AUTHENTICATION DATA (EMAIL, NAME)
    async _storeSignInData() {
        try {
            axios.get(axiosGetUsers)
                .then(res => {
                    res.data.map((user) => {
                        if (user.email == this.state.signInEmail) {
                            AsyncStorage.setItem('EMAIL', this.state.signInEmail)
                            AsyncStorage.setItem('NAME', user.userName)
                            console.log(AsyncStorage.getItem('EMAIL', (err, item) => item))
                            console.log(AsyncStorage.getItem('NAME', err))
                            console.log('AUTHENTICATION DATA STORED')
                        }
                    })
                })
                .catch(err => {
                    console.log('AUTHENTICATION DATA NOT STORED')
                    // console.log(err)
                })
        } catch (error) {
            console.log(error.message);
        }
    }

    _handleSignIn() {
        const userData = {
            email: this.state.signInEmail,
            password: this.state.signInPassword
        }

        this.setState({ signInLoading: true })

        axios.post(axiosSignIn, userData)
            .then(res => {
                this._storeSignInData()
                this.setState({ signInLoading: false })
                console.log('LOGIN SUCCESS')
            })
            .catch(err => {
                this.setState({ signInLoading: false, singInStatus: true })
                console.log('LOGIN FAIL')
            })
    }

    _handleRequestNewPassword() {
        const userReset = {
            email: this.state.requestNewPasswordEmail,
        }

        this.setState({ requestNewPasswordLoading: true })

        axios.post(axiosRequestNewPassword, userReset)
            .then(res => {
                this._storeSignInData()
                this.setState({ requestNewPasswordLoading: false, requestNewPasswordStatus: 1 })
                console.log('PASSWORD REQUEST SUCCESS')
            })
            .catch(err => {
                this.setState({ requestNewPasswordLoading: false, requestNewPasswordStatus: 0 })
                console.log('PASSWORD REQUEST FAIL')
                console.log(err)
            })
    }

    _switchScreen() {
        this.setState({ screen: !this.state.screen })
    }

    render() {
        if (this.state.screen) { }
        return (
            <View style={{ flex: 1 }} >
                <ScrollView style={[styles.container, styles.containerCenter]} contentContainerStyle={[styles.screen, styles.screenCenter]}>
                    {
                        !this.state.screen ?
                            (
                                <Card style={[styles.card, styles.spacer]}>
                                    <Card.Title style={styles.defaultMarginVertical} titleStyle={styles.title} title={strings.requestNewPasswordTitle} />
                                    <Divider />
                                    <Card.Content style={[styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                                        <TextInput
                                            style={[styles.spacer, styles.inputText]}
                                            mode='outlined'
                                            secureTextEntry={false}
                                            label={strings.requestNewPasswordEmail}
                                            value={this.state.requestNewPasswordEmail}
                                            error={this.state.requestNewPasswordEmail == '' ? true : false}
                                            onChangeText={value => this.setState({ requestNewPasswordEmail: value })}
                                        />
                                    </Card.Content>
                                    <Divider />
                                    <Card.Actions style={[styles.cardActionsRight, styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                                        <Text
                                            style={this.state.requestNewPasswordStatus == 0 ? styles.errorText : this.state.requestNewPasswordStatus == 1 ? styles.successText : styles.normalText}
                                        >
                                            {this.state.requestNewPasswordStatus == 0 ? strings.requestNewPasswordFail : this.state.requestNewPasswordStatus == 1 ? strings.requestNewPasswordSuccess : ''}
                                        </Text>
                                        <Button
                                            disabled={this.state.requestNewPasswordLoading ? true : false}
                                            mode='contained'
                                            onPress={() =>
                                                this._handleRequestNewPassword()
                                            }
                                            loading={this.state.requestNewPasswordLoading ? true : false}
                                        >
                                            {this.state.requestNewPasswordLoading ? strings.requestingNewPassword : strings.requestNewPassword}
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            )
                            :
                            (
                                <Card style={[styles.card, styles.spacer]}>
                                    <Card.Title style={styles.defaultMarginVertical} titleStyle={styles.title} title={strings.signInTitle} />
                                    <Divider />
                                    <Card.Content style={[styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                                        <TextInput
                                            style={[styles.spacer, styles.inputText]}
                                            mode='outlined'
                                            secureTextEntry={false}
                                            label={strings.signInEmail}
                                            value={this.state.signInEmail}
                                            error={this.state.signInEmail == '' ? true : false}
                                            onChangeText={value => this.setState({ signInEmail: value })}
                                        />
                                        <TextInput
                                            style={[styles.inputText]}
                                            label={strings.signInPassword}
                                            mode='outlined'
                                            secureTextEntry={true}
                                            value={this.state.signInPassword}
                                            error={this.state.signInPassword == '' ? true : false}
                                            onChangeText={value => this.setState({ signInPassword: value })}
                                        />
                                    </Card.Content>
                                    <Divider />
                                    <Card.Actions style={[styles.cardActionsRight, styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                                        <Text style={styles.errorText}>{this.state.singInStatus ? strings.signInFail : ''}</Text>
                                        <Button
                                            disabled={this.state.signInLoading ? true : false}
                                            mode='contained'
                                            onPress={() =>
                                                this._handleSignIn()
                                            }
                                            loading={this.state.signInLoading ? true : false}
                                        >
                                            {this.state.signInLoading ? strings.signingIn : strings.signIn}
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            )
                    }
                </ScrollView>
                <FAB
                    style={styles.fab}
                    disabled={this.state.signInLoading || this.state.requestNewPasswordLoading ? true : false}
                    icon={this.state.screen ? 'lock' : 'send'}
                    onPress={() => this._switchScreen()}
                    label={this.state.screen ? strings.requestNewPasswordTitle : strings.signInTitle}
                />
            </View >

        )
    }
}