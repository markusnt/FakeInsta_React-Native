import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class InputComentario extends Component {

    constructor() {
        super()
        this.state = {
            valorComentario: ''
        }
    }

    render() {
        return (

            <View style={styles.novoComentario}>
                <TextInput style={styles.input}
                    placeholder="Adicione um comentario..."
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({ valorComentario: texto })} />

                <TouchableOpacity onPress={ () => {
                    this.props.comentarioCallback(this.state.valorComentario, this.inputComentario)
                    this.setState({valorComentario: ''})
                }}>
                    <Image style={styles.icone} source={require('../../resources/img/send.png')} />
                </TouchableOpacity>
            </View>

        )
    }

}


const styles = StyleSheet.create({
    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },

    input: {
        flex: 1,
        height: 40,

    },

    icone: {
        width: 25,
        height: 25
    },

})