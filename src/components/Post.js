/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

  carregaIcone(likeada) {
    return likeada ? require('../../resources/img/s2-checked.png') :
      require('../../resources/img/s2.png')
  }

  exibeLikes(likers) {
    if (likers.length <= 0)
      return;

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
    );
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

  adicionaComentario() {
    if (this.state.valorComentario === '')
      return;

    const novaLista = [...this.state.foto.comentarios, {
      id: this.state.valorComentario,
      login: 'meuUsuario',
      texto: this.state.valorComentario
    }];

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }

    this.setState({ foto: fotoAtualizada, valorComentario: '' })
    this.inputComentario.clear();

  }

  render() {
    const { foto } = this.state;
    return (
      //         style={styles.ImagemBulbaBackground}>
      <View>

        <View style={styles.Cabecalho} >
          <Image source={{ uri: foto.urlPerfil }}
            style={styles.ImgPerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>

        <Image source={{ uri: foto.urlFoto }}
          style={styles.ImgPost} />

        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like.bind(this)}>
            <Image style={styles.botaoDeLike}
              source={this.carregaIcone(foto.likeada)} />
          </TouchableOpacity>

          {this.exibeLikes(foto.likers)}
          {this.exibeLegenda(foto)}

          {foto.comentarios.map(comentario =>
            <View style={styles.comentario} key={comentario.id}>
              <Text style={styles.tituloComentario}>{comentario.login}</Text>
              <Text>{comentario.texto}</Text>
            </View>
          )}

          <View style={styles.novoComentario}>
            <TextInput style={styles.input}
              placeholder="Adicione um comentario..."
              ref={input => this.inputComentario = input}
              onChangeText={texto => this.setState({ valorComentario: texto })} />

            <TouchableOpacity onPress={this.adicionaComentario.bind(this)}>
              <Image style={styles.icone} source={require('../../resources/img/send.png')} />
            </TouchableOpacity>
          </View>

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

  botaoDeLike: {
    width: 40,
    height: 40,
    marginBottom: 10
  },

  rodape: {
    margin: 10
  },

  like: {
    fontWeight: 'bold'
  },

  comentario: {
    flexDirection: 'row'
  },

  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },

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
  }

});
