import React from 'react';
import { Appbar, Avatar, Button, Card, Divider, List } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import styles from '../assets/stylesheet/General'

const Pending = props => <Avatar.Icon {...props} icon="dots-horizontal" />
const Done = props => <Avatar.Icon {...props} icon="check" />
const Student = props => <List.Icon {...props} icon="school" />
const StringFill = 'Preencher'
const StringFilled = 'Preenchido'

export const HomeScreen = ({ navigation }) => {

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


    // _handleMore = () => console.log('More');

    // state = {

    // }
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Content
                    title="Avaliatec"
                />
                <Appbar.Action icon="dots-vertical" onPress={() => console.log('More')} />
            </Appbar.Header>
            <ScrollView style={styles.container} contentContainerStyle={styles.screen}>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Avaliação" subtitle="14/04/2014" left={Pending} />
                    <Divider />
                    <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                        <List.Item
                            title="名前はあきです"
                            left={Student}
                        />
                        <List.Item
                            title="可愛い学生がいました"
                            left={Student}
                        />
                        <List.Item
                            title="鉛筆のケーキでした"
                            left={Student}
                        />
                        <List.Item
                            title="あきさんは学校で鉛筆を食べます"
                            left={Student}
                        />
                    </Card.Content>
                    <Divider />
                    <Card.Actions style={styles.cardActionsRight}>
                        <Button disabled={false}>{StringFill}</Button>
                    </Card.Actions>
                </Card>

                <Card style={[styles.card, styles.spacer]}>
                    <Card.Title title="Avaliação" subtitle="14/04/2014" left={Done} />
                    <Divider />
                    <Card.Content style={styles.defaultHalfPaddingHorizontal}>
                        <List.Item
                            title="名前はあきです"
                            left={Student}
                        />
                        <List.Item
                            title="可愛い学生がいました"
                            left={Student}
                        />
                        <List.Item
                            title="鉛筆のケーキでした"
                            left={Student}
                        />
                        <List.Item
                            title="あきさんは学校で鉛筆を食べます"
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
            </ScrollView>
        </View>
    );
};