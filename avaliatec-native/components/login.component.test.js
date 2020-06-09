import * as React from 'react';
import { View, ScrollView, Text } from 'react-native'
import { TextInput, Button, Card, Divider } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import styles from '../assets/stylesheet/General'
import axios from 'axios';

const axiosSignIn = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/login'
const axiosGetUsers = 'https://us-central1-avaliatec-80c1a.cloudfunctions.net/api/users'

const strings = {
    title: 'Avaliatec',
    email: 'E-mail',
    password: 'Senha',
    signIn: 'Acessar',
    signingIn: 'Acessando',
    fail: 'E-mail ou senha incorretos'
}

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            authStatus: false,
            firstRun: true,
            loading: false,
            fail: false,
            users: [],
        };
    }

    // SAVE AUTHENTICATION DATA (EMAIL, NAME)
    async _storeSignInData() {
        try {
            axios.get(axiosGetUsers)
                .then(res => {
                    res.data.map((user) => {
                        if (user.email == this.state.email) {
                            AsyncStorage.setItem('EMAIL', this.state.email)
                            AsyncStorage.setItem('NAME', user.userName)
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

    _handleSignIn(event) {
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.setState({ loading: true })

        axios.post(axiosSignIn, userData)
            .then(res => {
                this._storeSignInData()
                this.setState({ loading: false })
                console.log('LOGIN SUCCESS')
            })
            .catch(err => {
                this.setState({ loading: false, fail: true })
                console.log('LOGIN FAIL')
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={[styles.container, styles.containerCenter]} contentContainerStyle={[styles.screen, styles.screenCenter]}>
                    <Card style={[styles.card, styles.spacer]}>
                        <Card.Title titleStyle={styles.title} title={strings.title} />
                        <Divider />
                        <Card.Content style={[styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                            <TextInput
                                style={[styles.spacer, styles.inputText]}
                                mode='outlined'
                                secureTextEntry={false}
                                label={strings.email}
                                value={this.state.email}
                                error={this.state.email == '' ? true : false}
                                onChangeText={value => this.setState({ email: value })}
                            />
                            <TextInput
                                style={[styles.inputText]}
                                label={strings.password}
                                mode='outlined'
                                secureTextEntry={true}
                                value={this.state.password}
                                error={this.state.password == '' ? true : false}
                                onChangeText={value => this.setState({ password: value })}
                            />
                        </Card.Content>
                        <Divider />
                        <Card.Actions style={[styles.cardActionsRight, styles.defaultPaddingHorizontal, styles.defaultPaddingVertical]}>
                            <Text style={styles.errorText}>{this.state.fail ? strings.fail : ''}</Text>
                            <Button
                                disabled={this.state.loading ? true : false}
                                mode='contained'
                                onPress={() =>
                                    this._handleSignIn()
                                }
                                loading={this.state.loading ? true : false}
                            >
                                {this.state.loading ? strings.signingIn : strings.signIn}
                            </Button>
                        </Card.Actions>
                    </Card>
                </ScrollView>
            </View >

        )
    }
}