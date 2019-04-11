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

  like() {
    const { foto } = this.state;

    let novaLista = []

    if (!foto.likeada) {
      novaLista = [
        ...foto.likers,
        { login: 'meuUsuario' }
      ]
      // foto.likers.concat({login: 'meuUsuario'})
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario'
      })
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    this.setState({ foto: fotoAtualizada })
  }

  adicionaComentario(valorComentario, inputComentario) {
    if (valorComentario === '')
      return;

    const novaLista = [...this.state.foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }

    this.setState({ foto: fotoAtualizada})
    inputComentario.clear();

  }

  render() {
    const { foto } = this.state;
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
          
          <Likes foto={foto} likeCallback={this.like.bind(this)} />
          {this.exibeLegenda(foto)}

          {foto.comentarios.map(comentario =>
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          )}

          <InputComentario
            comentarioCallback={this.adicionaComentario.bind(this)}
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
