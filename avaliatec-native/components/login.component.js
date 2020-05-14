import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from '../assets/stylesheet/Custom'

export const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.middle}>
            <View style={{ width: '100%' }}>
                <Card style={styles.defaultMarginHorizontal}>
                    <Card.Content>
                        <Title>Acesso</Title>
                        <TextInput
                            style={styles.marginBottom}
                            label='E-mail'
                            value={email}
                            onChangeText={value => setEmail(value)}
                        />
                        <TextInput
                            label='Password'
                            value={password}
                            onChangeText={value => setPassword(value)}
                        />
                    </Card.Content>
                    <Card.Actions
                        style={{ justifyContent: 'flex-end' }}
                    >
                        <Button
                            style={styles.marginRight}
                            mode="text"
                            onPress={() => console.log(email)}>
                            Esquecí a senha
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => signIn({ username, password })}>
                            Acessar
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        </View>
    )
}
