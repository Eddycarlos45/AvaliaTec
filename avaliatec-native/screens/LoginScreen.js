import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from '../assets/stylesheet/Custom'

export default class LoginScreen extends React.Component {
    state = {
        email: '',
        password: ''
    };

    render() {
        return (
            <View style={styles.middle}>
                <View style={{ width: '100%' }}>
                    <Card style={styles.defaultMarginHorizontal}>
                        <Card.Content>
                            <Title>Acesso</Title>
                            <TextInput
                                style={styles.marginBottom}
                                label='E-mail'
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                            />
                            <TextInput
                                label='Password'
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                        </Card.Content>
                        <Card.Actions
                            style={{ justifyContent: 'flex-end' }}
                        >
                            <Button
                                style={styles.marginRight}
                                mode="text"
                                onPress={() => console.log('forgot password')}>
                                Esquecí a senha
                        </Button>
                            <Button
                                mode="contained"
                                onPress={() => console.log('login')}>
                                Acessar
                        </Button>
                        </Card.Actions>
                    </Card>
                </View>
            </View>
        )
    }
}

