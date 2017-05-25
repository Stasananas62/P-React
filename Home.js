'use strict';

import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import TopMenu from './TopMenu';//ты написал, что это строка не нужно, но  она нужна для портирования данных
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeIcon = (<Icon name="home" size={60} color="#708090" />)//home


const STORAGE_PREFIX = '@QarSyncManagerFiles:files';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: 'file1',
            file: 'empty',
        };
    }

    addFile() {
        AsyncStorage
            .setItem(STORAGE_PREFIX, this.state.inputText)
            .done(() => {
                this.setState({file: this.state.inputText});
            });
    }
    render() {
        let Actions = this.props.routes;
        return (
            <View style={styles.container}>
              <TopMenu settingsActions={ Actions.settings }/>
              <View style={styles.homePage}>
              <Text>{HomeIcon}</Text>
                  <Text>Home page</Text>
                  <Text style={styles.filesTitle}>Files:</Text>
                  <Text>{ this.state.file }</Text>
                  <TextInput style={ styles.inputFileName }
                      autoCapitalize="none"
                      value={this.state.inputText}
                      onChangeText={(text) => this.setState({inputText: text})}
                  />
                  <Button onPress={ this.addFile.bind(this) }  title="addFile" >Add File</Button>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
    },
    homePage: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0FFFF',
    },
    filesTitle: {
        margin: 25,
    },
    inputFileName: {
        width: 300,
    }
});

module.exports = Home;
