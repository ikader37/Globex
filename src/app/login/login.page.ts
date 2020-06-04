import { Component, OnInit } from '@angular/core';
import {FirebaseAuthentication}  from '@ionic-native/firebase-authentication/ngx';
import { FirestoreService } from '../serivces/data/firestore.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   public users;//:Observable<User[]>;
   oeil="eye-outline";
   password_type="password";

  code:string="";
  verifId:any;
  tel:string="";
  password:string="";
  ind:string="";

  constructor( private firestoreService: FirestoreService,
    private router: Router,public navCtrl:NavController) { 
      
    }

  ngOnInit() {
    this.firestoreService.getUserList().subscribe(data=>{
      this.users=data.map(e=>{
        return{
          nom:e.payload.doc.data()['nom'],
          prenom:e.payload.doc.data()['prenom'],
          tel:e.payload.doc.data()['tel'],
          password:e.payload.doc.data()['password'],
          
        };
      })
    });

  }


  login(){

    for(let u of this.users){
     if(u.tel==this.ind+this.tel && u.password ==this.password){
       console.log(u);
       this.navCtrl.navigateForward(['/accueil']);

       break;
     }
      
      //console.log(this.firestoreService.getUserList().valueChanges().forEach.toString());
    }
  }
  // send(){


  //   this.fireAuth.verifyPhoneNumber("+22660793454",30000).then((verificationId)=>{
  //     console.log(verificationId);
  //     this.verifId=verificationId;
  //   });


  //   this.fireAuth.verifyPhoneNumber("+22660793454", 60, function(credential) {
  //     console.log(credential);
  
  //     // ask user to input verificationCode:
  //    // var code = inputField.value.toString();
  
  //     this.verifId = credential.verificationId;
      
  //     //var signInCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
  //     //firebase.auth().signInWithCredential(signInCredential);
  // }, function(error) {
  //     console.error(error);
  // });


  // }

  // verify(){

  // }



  visiblePass(){
    if(this.password_type=="password"){
      this.password_type="text";
      this.oeil="eye-off-outline";
      console.log("cliq invisible-visible");
    }else{
      this.password_type="password";
      console.log("cliq visible-invisible");
      this.oeil="eye-outline";
    }

  }
}
