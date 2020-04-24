import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import styles from '../assets/stylesheet/General'

import AssessmentScreen from './AssessmentScreen'
import AssessmentFormScreen from './AssessmentFormScreen'

export default class HomeScreen extends React.Component {
    _handleNavigationDrawer = () => console.log('Navigation drawer');

    _handleMore = () => console.log('More');

    state = {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={styles.appBar}>
                    <Appbar.Content
                        title="Avaliatec"
                    />
                    <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
                </Appbar.Header>
                <ScrollView style={styles.container} contentContainerStyle={styles.screen}>
                    <AssessmentFormScreen />
                </ScrollView>
            </View>

        );
    }
}