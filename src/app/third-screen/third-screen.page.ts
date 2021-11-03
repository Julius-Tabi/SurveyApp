import { Component, OnInit } from '@angular/core';

import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-third-screen',
  templateUrl: './third-screen.page.html',
  styleUrls: ['./third-screen.page.scss'],
})
export class ThirdScreenPage implements OnInit {
  surveys: Array<any> = [];
  surveysOldest: Array<any> = [];
  oldest:any;
  surveysYoungest: Array<any> = [];
  Total_surveys:number;
  TotalaverageAge:number;
  Age : any;
  averageAge: number;
  // totalaverageAge:any;
  totalaverageAgeArray:Array<any> = [];
  pizzaArray: Array<any> = [];
  // someArray: Array<any> = [];
  pizzaCount:any;
  AllsurveysArray: Array<any> = [];
  Pizzatotal:number;
  eatout:Array<any> = [];
  Totaleatout: number;
  TotaleatoutAdd: any;
  pastaCount: number;
  pastaArray: Array<any> = [];
  Pastatotal: number;
  papandWorsArray:  Array<any> = [];
  papNworsCount: number;
  PapNworstotal: number;
  chickenStirfryArray: Array<any> = [];
  chickenStirfrytotal: number;
  chickenStirfryCount: any;
  beefStirfryArray:  Array<any> = [];
  beefStirfryCount: number;
  beefStirfrytotal: number;
  otherArray: Array<any> = [];
  otherCount: number;
  othertotal: number;
  allsurveyCount: number;
  eatoutCount: number;
  tv:  Array<any> = [];
  tvCount: number;
  Totaltv: number;
  moviesArray:Array<any> = [];
  moviesCount: any;
  Totalmovies: number;
  radioArray: Array<any> = [];
  radioCount: any;
  Totalradio: number;
  movies: string;
  Tv: string;
  radio: string;
  Eatout: string;
  pizza: string;
  pasta: string;
  papNwors: string;
  chicken: string;
  beef: string;
  others: string;
  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController,private router: Router) { }



  ngOnInit() {
    //get survey from firebase server
    firebase.firestore().collection('Surveys').onSnapshot(res => {
      res.forEach(element => {
        this.surveys.push(element.data());
        this.surveys.sort();
        this.Total_surveys = this.surveys.length;
        console.log('Total No of surveys',this.Total_surveys);
        console.log('Survey data',this.surveys);
      });
    });
    //oldest
    firebase.firestore().collection('Surveys').orderBy('age','desc').limit(1).onSnapshot(res => {
      res.forEach(element => {
        this.surveysOldest.push(element.data());
        this.oldest = this.surveysOldest.sort();
        console.log('Oldest person',this.oldest);
      });
    });
    //youngest person
    firebase.firestore().collection('Surveys').orderBy('age','asc').limit(1).onSnapshot(res => {
      res.forEach(element => {
        this.surveysYoungest.push(element.data());
       this.surveysYoungest.sort();
        console.log('youngest person',this.surveysYoungest);
      });
    });
    //average age of
    this.calcaverage();
    this.calcRatingaverage();


    //pizza
    firebase.firestore().collection('Surveys').onSnapshot(res => {
      this.AllsurveysArray=[];
      this.AllsurveysArray.length;
      // console.log('Godfrey', this.AllsurveysArray.length);
      res.forEach(element => {
        this.AllsurveysArray.push(element.data());
        this.allsurveyCount = this.AllsurveysArray.length ;
    
        //pizza
        if (element.data().ingredients[0].isChecked == true && element.data().ingredients[0].name == "Pizza") {
          // this.pizzaArray =[];
          this.pizzaArray.push(element.data().ingredients[0]);
          this.pizzaCount = this.pizzaArray.length ;
          // this.Pizzatotal = this.pizzaCount / this.allsurveyCount;
          console.log(" length pizza", this.pizzaCount);
          console.log("Data:", this.pizzaArray)
        }
        
        
        this.AllsurveysArray.push(element.data());
    
        //pasta
        if (element.data().ingredients[1].isChecked == true && element.data().ingredients[1].name == "Pasta") {
        
          this.pastaArray.push(element.data().ingredients[1]);
          this.pastaCount = this.pastaArray.length;
        }

        //pap and wors
        if (element.data().ingredients[2].isChecked == true && element.data().ingredients[2].name == "pap and Wors") {
          // console.log("hello!",element.data().ingredients[2]);
          
          this.papandWorsArray.push(element.data().ingredients[2]);
          this.papNworsCount = this.papandWorsArray.length;
          // this.PapNworstotal = Math.round((this.papNworsCount / this.AllsurveysArray.length)*100);
          console.log("some array length pap and wors", this.papNworsCount);
          console.log("pap and wors percentage", this.PapNworstotal);
        }

       
       
        //chicken Stir fry 
        if (element.data().ingredients[3].isChecked == true && element.data().ingredients[3].name == "Chicken stir fry") {
          // console.log("hello!",element.data().ingredients[3]);
          this.chickenStirfryArray.push(element.data().ingredients[3]);
          this.chickenStirfryCount = this.chickenStirfryArray.length;
          // this.chickenStirfrytotal = Math.round((this.chickenStirfryCount / this.AllsurveysArray.length)*100);
          console.log("some array length chicken Stir fry", this.chickenStirfryCount);
          console.log("chicken Stir frypercentage", this.chickenStirfrytotal);
        }

        // //get all the surveys and get array element at 4
  
       
        //beef Stir fry 
        if (element.data().ingredients[4].isChecked == true && element.data().ingredients[4].name == "Beef stir fry") {
          // console.log("hello!",element.data().ingredients[4]);
          this.beefStirfryArray.push(element.data().ingredients[4]);
          this.beefStirfryCount = this.beefStirfryArray.length;
          // this.beefStirfrytotal = Math.round((this.beefStirfryCount / this.AllsurveysArray.length)*100);
          console.log("some array length beef Stir fry ", this.beefStirfryCount);
          console.log("beef Stir fry  percentage", this.beefStirfrytotal);
        }

        //     //get all the surveys and get array element at 5
        //clear before pushing to avoid duplication
            // this.AllsurveysArray.push(element.data());
            // this.otherArray.push(element.data().ingredients[5]);
           
            //other
            if (element.data().ingredients[5].isChecked == true && element.data().ingredients[5].name == "Other") {
              // console.log("hello!",element.data().ingredients[5]);
              
              this.otherArray.push(element.data().ingredients[5]);
              this.otherCount = this.beefStirfryArray.length;
              // this.othertotal = Math.round((this.otherCount / this.AllsurveysArray.length)*100);
              console.log("some array length other", this.otherCount);
              console.log("other percentage", this.othertotal);
            }
      });
      console.log("Julius", this.AllsurveysArray.length);
      console.log("Pizza length", this.pizzaCount);
      //pizza percentage calculation
      this.Pizzatotal = this.pizzaCount / this.allsurveyCount * 100;
      this.pizza = this.Pizzatotal.toFixed(1);
      console.log("real piza data", this.pizza);
     
      //pasta percentage calculation
      this.Pastatotal = (this.pastaCount / this.allsurveyCount) * 100;
      this.pasta = this.Pastatotal.toFixed(1);
      console.log("real pasta data", this.pasta);

      //pap and wors percentage calculation
      this.PapNworstotal = (this.papNworsCount / this.allsurveyCount) * 100;
      this.papNwors = this.PapNworstotal.toFixed(1);
      console.log("real pap and wors data", this.papNwors);

      //chicken Stir fry percentage calculation
      this.chickenStirfrytotal = (this.chickenStirfryCount / this.allsurveyCount) * 100;
      this.chicken = this.chickenStirfrytotal.toFixed(1);
      console.log("real chicken Stir fry data", this.chicken);

      //beef Stir fry percentage calculation
      this.beefStirfrytotal = (this.beefStirfryCount / this.allsurveyCount) * 100;
      this.beef = this.beefStirfrytotal.toFixed(1);
      console.log("real beef Stir fry data", this.beef);

      //Other  percentage calculation
      this.othertotal = (this.otherCount / this.allsurveyCount) * 100;
      this.others = this.othertotal.toFixed(1);
      console.log("real other total data", this.others);
    });

  }
  calcaverage(){
    firebase.firestore().collection('Surveys').onSnapshot(res => {
      res.forEach(element => {
        this.totalaverageAgeArray.push(element.data().age);
        this.TotalaverageAge = Math.round(this.totalaverageAgeArray.reduce((a, b) => a + b, 0) / (this.totalaverageAgeArray.length));
        console.log(this.TotalaverageAge);
      });
    });
  }

  calcRatingaverage(){
    firebase.firestore().collection('Surveys').onSnapshot(res => {
      res.forEach(element => {
        let eatoutInt = Number(element.data().EatoutRating);
        this.eatout.push(eatoutInt);
        this.eatoutCount = this.eatout.length;
        
        let moviesInt = Number(element.data().MoviesRating);
        this.moviesArray.push(moviesInt);
        this.moviesCount = this.moviesArray.length;
        
        let tvInt = Number(element.data().TvRating);
        this.tv.push(tvInt);
        this.tvCount = this.tv.length;
        
        let radioInt = Number(element.data().RadioRating);
        this.radioArray.push(radioInt);
        this.radioCount = this.radioArray.length;
        
        // console.log("shit",this.TotaleatoutAdd);
      });
      this.Totaleatout = (this.eatout.reduce((a, b) => a + b, 0) / (this.eatoutCount));
      this.Eatout = this.Totaleatout.toFixed(1);
      console.log("Total rating of eatout", this.Eatout);
      
      this.Totalmovies = (this.moviesArray.reduce((a, b) => a + b, 0) / (this.moviesCount));
      this.movies = this.Totalmovies.toFixed(1)
      console.log("Total rating of movies", this.movies);
      
      this.Totaltv = (this.tv.reduce((a, b) => a + b, 0) / (this.tvCount));
      this.Tv = this.Totaltv.toFixed(1);
      console.log("Total rating of Tv", this.Tv);
      
      this.Totalradio = (this.radioArray.reduce((a, b) => a + b, 0) / (this.radioCount));
      this.radio = this.Totalradio.toFixed(1);
      console.log("Total rating of radio", this.radio);
    });
  }
  
}
