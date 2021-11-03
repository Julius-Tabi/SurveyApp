import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
// import * as firebase from 'firebase/app';
var firebaseConfig = {
  apiKey: "AIzaSyAacYHSu_3ugRiitxMNGFbEC8lTHsR82rA",
  authDomain: "survey-cdca2.firebaseapp.com",
  projectId: "survey-cdca2",
  storageBucket: "survey-cdca2.appspot.com",
  messagingSenderId: "524970347389",
  appId: "1:524970347389:web:7caf7cdb03428ff4ec5a14",
  measurementId: "G-4J8EG4GM74"
};
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
