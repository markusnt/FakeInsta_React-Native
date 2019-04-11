/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // foto: { ...this.props.foto, likers: [{}] }
      foto: this.props.foto,
      valorComentario: ''
    }
  }

  exibeLegenda(foto) {
    if (foto.comentario === '')
      return;

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    );
  }

  render() {
    const { foto, likeCallback, comentarioCallback } = this.props;
    return (
      <View>

        <View style={styles.Cabecalho} >
          <Image source={{ uri: foto.urlPerfil }}
            style={styles.ImgPerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>

        <Image source={{ uri: foto.urlFoto }}
          style={styles.ImgPost} />

        <View style={styles.rodape}>
          <Likes foto={foto} likeCallback={likeCallback} />
          {this.exibeLegenda(foto)}

          {foto.comentarios.map(comentario =>
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          )}

          <InputComentario idFoto = {foto.id}
            comentarioCallback={comentarioCallback}
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({


  Cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  ImgPerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },

  ImgPost: {
    width: width,
    height: width
  },

  rodape: {
    margin: 10
  },

  comentario: {
    flexDirection: 'row'
  },

  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },

});
