/**
 * @format
 */

import { Navigation } from "react-native-navigation";


import Feed from './src/screens/Feed';
import Login from './src/screens/Login.js';

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => Login);
Navigation.registerComponent(`Feed`, () => Feed);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});


// https://www.youtube.com/watch?v=8SO-UCHurVc
// ASSISTIR ESSE VIDEO PARA INSTALAR O REACT NATIVE NAVIGATION V.2