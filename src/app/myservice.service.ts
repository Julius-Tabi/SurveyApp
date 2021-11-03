import { Injectable } from '@angular/core';
import  * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  // reserve() {
  //   return firebase.firestore().collection('Surveys');
  // }
   
  constructor() { }
}
