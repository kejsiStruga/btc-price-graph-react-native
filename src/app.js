import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Chart from './containers/Chart';
import Ranges from './containers/Ranges';
import List from './containers/List';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Chart />
                <Ranges />
                <List />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // take up the whole screen 
        paddingTop: 20, // put content below status bar
    },
})
