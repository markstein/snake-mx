import firebase from "firebase/app";
import "firebase/firestore";

import { GameService } from "./GameService";
import { Utils } from "./Utils";

function start() {
  initFirebase();

  function initFirebase() {
    console.log("Init Firebase");

    document.addEventListener("DOMContentLoaded", function() {
      var config = {
        apiKey: "AIzaSyC_aAOluJzHduoGF3uGQR-MxbPELb4d4dg",
        authDomain: "snake-mx.firebaseapp.com",
        databaseURL: "https://snake-mx.firebaseio.com",
        projectId: "snake-mx",
        storageBucket: "snake-mx.appspot.com",
        messagingSenderId: "757458910658"
      };
      firebase.initializeApp(config);

      let app: any = firebase.app();
      let features = ["auth", "firestore", "database", "messaging", "storage"].filter(
        feature => typeof app[feature] === "function"
      );
      console.log(`Firebase SDK loaded with ${features.join(", ")}`);

      const firestore = firebase.firestore();
      const settings = { timestampsInSnapshots: true };
      firestore.settings(settings);

      initGame();
    });
  }

  function initGame() {
    var gameService = new GameService();
    let gameUid = window.location.hash ? window.location.hash.substring(1) : Utils.createUid();
    window.location.hash = "#" + gameUid;
    gameService.setup(gameUid);
  }
}

start();
