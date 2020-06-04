import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../serivces/data/firestore.service';
import {NavController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  public createUserForm: FormGroup;
  error:boolean=false;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    public navCtrl:NavController,
    public toastController: ToastController

  ) { 

    this.createUserForm = formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      password: ['', Validators.required],
      ind:['',Validators.required ]
    });
  }

  ngOnInit() {
  }



  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }



   createUser(){//async

    //const loading = await this.loadingCtrl.create();

  const nom = this.createUserForm.value.nom;
  const prenom = this.createUserForm.value.prenom;
  const tel = this.createUserForm.value.ind+""+this.createUserForm.value.tel;
  const password = this.createUserForm.value.password;

  this.firestoreService.createUser(nom, prenom, tel, password)
    .then(
      () => {
        //loading.dismiss().then(() => {
          //this.router.navigateByUrl('');
          this.navCtrl.navigateForward(['/accueil']);
        //});
      },
      error => {
        console.error(error);
       // loading.dismiss().then(() => {
          //this.router.navigateByUrl('');
           this.error=true;
           this.presentToast();
           //this.navCtrl.navigateForward("/create-account");
         // this.navCtrl.navigateBack(['/accueil']);
       // });
        
        //loading.dismiss();
      }
    );

//  return await loading.present();


  }
}
