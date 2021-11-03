import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";

import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: "app-second-screen",
  templateUrl: "./second-screen.page.html",
  styleUrls: ["./second-screen.page.scss"],
})
export class SecondScreenPage implements OnInit {
  
  today = Date.now();
  personal_details=[];
  likesList:any=[];
  like:any=[];
  uid: any;
  Eatout: string;
  favourites:any;
  Age;
  Ingredients = [
    { name: 'Pizza', isChecked: false },
    { name: 'Pasta', isChecked: false },
    { name: 'pap and Wors', isChecked: false },
    { name: 'Chicken stir fry', isChecked: false },
    { name: 'Beef stir fry', isChecked: false },
    { name: 'Other', isChecked: false },
  ];
  msg: string;
 
  
  constructor(private formBuilder: FormBuilder,public loadingCtrl: LoadingController, private alertCtrl: AlertController,private router: Router) {}
  get name() {
    return this.RegForm.get("name");
  }
  get lastname() {
    return this.RegForm.get("lastname");
  }
  get phone() {
    return this.RegForm.get("phone");
  }
  get age() {
    return this.RegForm.get("age");
  }
  get date() {
    return this.RegForm.get("date");
  }
  get ingredients() {
    return this.RegForm.get("ingredients");
  }
  get eatout() {
    return this.RegForm.get("eatout");
  }
  get movies() {
    return this.RegForm.get("movies");
  }
  get tv() {
    return this.RegForm.get("tv");
  }
  get radio() {
    return this.RegForm.get("radio");
  }
  public errorMessages = {
    name: [
      { type: "required", message: "Name is required" },
      { type: "maxlength", message: "Name cant be longer than 100 characters" },
    ],
    lastname: [
      { type: "required", message: "Last Name is required" },
      {
        type: "maxlength",
        message: "Last Name cant be longer than 100 characters",
      },
    ],
    
    phone: [
      { type: "required", message: "Phone number is required" },
      { type: "pattern", message: "Please enter a valid phone number" },
    ],
    age: [
      { type: "required", message: "Age is required" },
      { type: "pattern", message: "Please enter a valid Age" },
    ],
    date: [{ type: "required", message: "date is required" }],
    eatout: [{ type: "required", message: "rating is required" }],
    movies: [{ type: "required", message: "rating is required" }],
    tv: [{ type: "required", message: "rating is required" }],
    radio: [{ type: "required", message: "rating is required" }],
    ingredients: [{ type: "required", message: "Select at least one option" }],
  };
  RegForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.max(100)]],
    lastname: ["", [Validators.required, Validators.max(100)]],
    
    phone: [
      "",
      [
        Validators.required,
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"),
      ],
    ],
    age: [
      "",
      [
        Validators.required, Validators.max(3),
        // Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"),
      ],
    ],
    date: ["", [Validators.required]],

    ingredients: ["", [Validators.required]],
    eatout: ["", [Validators.required]],
    movies: ["", [Validators.required]],
    tv: ["", [Validators.required]],
    radio: ["", [Validators.required]],
  
  });
 
  disableDate() {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("date")[0].setAttribute("min", today);
    console.log(today);
  }
 
  
  async submit() {
    
    if (this.Age < 5 || this.Age > 120) {
        this.showAlertError() 
        this.msg = "error";
        console.log(this.msg);
      } else {
        
     this.personal_details.push(this.RegForm.value);
    console.log(this.personal_details);

    const loading = await this.loadingCtrl.create();
    
    const db = firebase.firestore()
    db.collection("Surveys").add({
        lastname: this.RegForm.value.lastname,
        firstnames: this.RegForm.value.name,
        contact: this.RegForm.value.phone,
        age: this.RegForm.value.age,
        date: this.RegForm.value.date,
        ingredients: this.Ingredients,
        EatoutRating:this.RegForm.value.eatout,
        MoviesRating:this.RegForm.value.movies,
        TvRating:this.RegForm.value.tv,
        RadioRating:this.RegForm.value.radio,
       

    }).then(() => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl('/home')
        this.RegForm.reset();
      });
    },  error => {
      loading.dismiss().then(() => {
        console.log(error);
      });
    }
    );
    return await loading.present();

        // this.router.navigate(['/banking-details']);
      }
   
  }
   async showAlertError() { 
     
  const alert = await this.alertCtrl.create({ 
    header: 'Alert', 
       message: 'Error!, Age cannot be less than 5 years or greater than 120 years.',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            
            this.router.navigateByUrl('/second-screen');
            this.RegForm.controls.age.reset();
            // this.RegForm.controls.age.asyncValidator;
      }
        },
      ]
    }); 
   await alert.present(); 
  } 
  
  ngOnInit() {

  }
  onClick(check) {
    console.log(check)
   }
   onClickeatout(eatout) {
    console.log(eatout)
   }
   eatoutChange(eatoutchange){
     console.log(eatoutchange)
   }

  

}
