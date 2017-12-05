import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form: NgForm){
    const loading = this.loadingController.create({
      content: 'Signing you in...'
    });
    loading.present();
    //console.log(form.value);
    this.authService.signin(form.value.email, form.value.password)
    .then(data => {
      //console.log(data);
      loading.dismiss();
    })
    .catch(error =>{
      //console.log(error);
      loading.dismiss();
      const alert = this.alertController.create({
        title: 'Signin Failed!',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
