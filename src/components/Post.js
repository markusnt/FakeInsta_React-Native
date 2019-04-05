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
  FlatList
} from 'react-native';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class Post extends Component {
  render() {

    return (
      //         style={styles.ImagemBulbaBackground}>
          <View>
            <View style={styles.Cabecalho} >
              <Image source={{uri: this.props.foto.urlPerfil}}
                style={styles.ImgPerfil} />
              <Text>{this.props.foto.loginUsuario}</Text>
            </View>
            <Image source={{uri: this.props.foto.urlFoto}}
              style={styles.ImgPost} />
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
  }

});
