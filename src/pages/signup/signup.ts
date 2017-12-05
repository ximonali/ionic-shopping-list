import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm){
    const loading = this.loadingController.create({
      content: 'Signing you up...'
    });
    loading.present();
    //console.log(form.value);
    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
      //console.log(data);
      loading.dismiss();

    })
    .catch(error => {
      //console.log(error);
      loading.dismiss();
      const alert = this.alertController.create({
        title: 'Signup failed!',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
