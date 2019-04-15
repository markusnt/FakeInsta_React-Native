import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  FlatList
} from 'react-native';

import Post from '../components/Post.js';
// import Header from './src/components/Header';
import Login from './Login.js';

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }));
  }

  buscarPorId(idFoto) {
    return this.state.fotos
      .find(foto => foto.id === idFoto)
  }

  atulizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos.map(foto =>
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos })
  }

  like(idFoto) {
    const foto = this.buscarPorId(idFoto)

    let novaLista = []

    if (!foto.likeada) {
      novaLista = [
        ...foto.likers,
        { login: 'meuUsuario' }
      ]
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

    this.atulizaFotos(fotoAtualizada)
  }


  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if (valorComentario === '')
      return;

    const foto = this.buscarPorId(idFoto)

    const novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }


    this.atulizaFotos(fotoAtualizada)
    inputComentario.clear();

  }


  render() {
    const title = 'Copa do Mundo 2018';
    return (
      // <Header title={title}/>
      <FlatList style={styles.Container}
        keyExtractor={item => String(item.id)}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item}
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.adicionaComentario.bind(this)} />
        }
      />
    );
  }
}

const margem = Platform.OS == 'ios' ? 20 : 0;
const styles = StyleSheet.create({

  Container: {
    marginTop: margem
  },

});

// AppRegistry.registerComponent(App, () => Login)


