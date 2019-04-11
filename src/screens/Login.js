import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    Dimensions,
    Button,
} from 'react-native';

const width = Dimensions.get('screen').width

export default class Login extends Component {

    render() {
        return (
            <View style={styles.container}>

            <Text style={styles.titulo}> DISNEY </Text>

                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Usuario..."
                        onChangeText={texto => this.setState({ usuario: texto })} />
                    <TextInput style={styles.input}
                        placeholder="Senha..."
                        onChangeText={texto => this.setState({ senha: texto })} />

                    <Button title='Login'
                        onPress={() => console.warn("Login")} />
                        
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titulo:{
        fontWeight: 'bold',
        fontSize: 26
    },

    form: {
        width: width * 0.8
    },

    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})
