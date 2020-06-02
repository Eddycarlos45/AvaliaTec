import React from 'react';
import { Appbar, Avatar, Button, Card, Divider, List, Provider, Menu } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native';
import styles from '../assets/stylesheet/General'


const Pending = props => <Avatar.Icon {...props} icon="dots-horizontal" />
const Done = props => <Avatar.Icon {...props} icon="check" />
const Student = props => <List.Icon {...props} icon="school" />
const StringFill = 'Preencher'
const StringFilled = 'Preenchido'

export const HomeScreen = ({ navigation }) => {

    const [firstRun, setFirstRun] = React.useState('true');
    const [soyVisible, setSoyVisible] = React.useState(true);

    navigateDetails = () => {
        navigation.navigate('Details');
    };

    navigateForm = (formID) => {
        navigation.navigate(formID)
    };

    _handleNavigationDrawer = () => {
        console.log('Navigation drawer');
    }

    navigateDetails = () => {
        navigation.navigate('Details');
    };

    const [menuVisible, setMenuVisible] = React.useState(false);

    _openMenu = () => {
        setMenuVisible(true)
    }

    _closeMenu = () => {
        setMenuVisible(false)
    }

    _logout = async () => {
        try {
            await AsyncStorage.setItem('USER', '');
            console.log('Estou desconectando')

        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    _getEmailAddress = async () => {
        try {
            console.log(await AsyncStorage.getItem('USER'))
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    (async function () {
        try {
            console.log(await AsyncStorage.getItem('USER'))
            console.log('placeholda')


        } catch (error) {
            console.log(error.message);
        }
    })();

    (async function () {
        if (firstRun == 'true') {
            setFirstRun('false')
            // navigation.dispatch(StackActions.popToTop());
        }
    })();

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Content
                    title='Avaliatec'
                    onPress={() => _getEmailAddress()}
                />
                <Menu
                    visible={menuVisible}
                    onDismiss={() => _closeMenu()}
                    anchor={
                        <Appbar.Action icon="dots-vertical" onPress={() => _openMenu()} />
                    }
                >
                    <Menu.Item onPress={() => _logout()} title="Sair" />
                </Menu>

            </Appbar.Header>
            <Provider>
                <View
                    style={{
                        paddingTop: 50,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>

                </View>
            </Provider>
            <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Avaliação 1" subtitle="01/02/2020" left={Pending} />
                    <Divider />
                    <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                        <List.Item
                            title="John Doe"
                            left={Student}
                        />
                        <List.Item
                            title="Jane Doe"
                            left={Student}
                        />
                        <List.Item
                            title="Johnny Appleseed"
                            left={Student}
                        />
                        <List.Item
                            title="Jane Appleseed"
                            left={Student}
                        />
                    </Card.Content>
                    <Divider />
                    <Card.Actions style={styles.cardActionsRight}>
                        <Button disabled={false}>{StringFill}</Button>
                    </Card.Actions>
                </Card>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Avaliação 2" subtitle="02/03/2020" left={Done} />
                    <Divider />
                    <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                        <List.Item
                            title="John Doe"
                            left={Student}
                        />
                        <List.Item
                            title="Jane Doe"
                            left={Student}
                        />
                        <List.Item
                            title="Johnny Appleseed"
                            left={Student}
                        />
                        <List.Item
                            title="Jane Appleseed"
                            left={Student}
                        />
                    </Card.Content>
                    <Divider />
                    <Card.Actions style={styles.cardActionsRight}>
                        <Button disabled={true}>{StringFilled}</Button>
                    </Card.Actions>
                </Card>
                <Button mode='contained' onPress={() => navigateForm('Form')} style={{ marginBottom: 12, borderRadius: 12 }}>
                    Go to next screen
                </Button>
                {soyVisible === true ?
                    <>
                        <Button mode='contained' onPress={() => setSoyVisible(false)} style={{ marginBottom: 12, borderRadius: 12 }}>
                            Vanish
                        </Button>
                    </>
                    :
                    <></>
                }

            </ScrollView>
        </View>
    );
};