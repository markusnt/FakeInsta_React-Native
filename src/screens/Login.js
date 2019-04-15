import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import CustomInput from '../components/CustomInput';

import Feed from './Feed';

import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    Dimensions,
    Button,
    AsyncStorage,
} from 'react-native';


const width = Dimensions.get('screen').width

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            mensagem: ''
        }
    }

    efetuarLogin() {

        const uri = "https://instalura-api.herokuapp.com/api/public/login"

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha,
            }),

            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch(uri, requestInfo)
            .then(response => {
                if (response.ok)
                    return response.text();

                throw new Error("Nao deu pra logar tiu");
            })
            .then(token => {
                AsyncStorage.setItem('token', token)
                AsyncStorage.setItem('usuario', this.state.usuario)

                Navigation.setRoot({
                    root: {
                        stack: {
                            id: 'App',
                            children: [
                                {
                                    component: {
                                        name: 'Feed',
                                    }
                                }
                            ],
                        }
                    }
                })
            })
            .catch(e => this.setState({ mensagem: e.message }))
    }

    // logout() {
    //     AsyncStorage.removeItem('usuario')
    //     AsyncStorage.removeItem('token')

    //     this.props.navigator.resetTo({
    //         screen: {
    //             screen:'Login',
    //             title: 'Login'
    //         }
    //     })
    // }
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Home'
                },
            }
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titulo}> LOGIN </Text>

                <View style={styles.form}>

                    {/* <CustomInput placeholder="Usuarios..."
                        capitalize="none"
                        onChange={text => this.setState({ usuario: text })} />

                    <CustomInput placeholder="Senha..."
                        capitalize="none" 
                        secure={true}
                        onChange={text => this.setState({ senha: text })} /> */}

                    <TextInput style={styles.input}
                        placeholder="Usuario..."
                        onChangeText={texto => this.setState({ usuario: texto })}
                        autoCapitalize="none" />

                    <TextInput style={styles.input}
                        placeholder="Senha..."
                        onChangeText={texto => this.setState({ senha: texto })}
                        secureTextEntry={true} />

                    <Button title='ENTRAR'
                        onPress={this.efetuarLogin.bind(this)} />

                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
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

    titulo: {
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
    },

    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    }
})
