import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { IngredientModel } from '../../models/ingredient.model';
import { PopoverController } from 'ionic-angular';
import { ShoppingOptions } from './shopping-options/shopping-options';
import { AuthService } from '../../services/auth';
import { AlertController,LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listIngredients: IngredientModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private slService: ShoppingListService,
              private popoverController: PopoverController,
              private authService: AuthService,
              private loadingController: LoadingController,
              private alertController: AlertController ) {
  }

  ionViewWillEnter(){
    this.loadItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  onAddItem(form: NgForm){
    console.log(form);
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onDeleteItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems(){
    this.listIngredients = this.slService.getItems();
  }

  onShowOptions(event: MouseEvent){
    const loading = this.loadingController.create({
      content: 'Please Wait...'
    });
    const popover = this.popoverController.create(ShoppingOptions);
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
        .then(
          (token: string) => {
            this.slService.fetchList(token)
            .subscribe(
              (list: IngredientModel[]) => {
                console.log('Success!');
                loading.dismiss();
                if (list){
                  this.listIngredients = list;
                }else{
                  this.listIngredients = [];
                }
              },
              error => {
                loading.dismiss();
                console.log(error);
                this.handleError(error.json().error);
              }
            );
          }
        );
      }else if (data.action == 'store') {
        loading.present();
        this.authService.getActiveUser().getToken()
        .then(
          (token: string) => {
            this.slService.storeList(token)
            .subscribe(
              () => {
                loading.dismiss();
                console.log('Success!');
              },
              error => {
                loading.dismiss();
                console.log(error);
                this.handleError(error.json().error);
              }
            );
          }
        );

      }
    });

  }

private handleError(errorMessage: string){
  const alert = this.alertController.create({
    title: 'Error Occurred!',
    message: errorMessage,
    buttons: ['OK']
  });
  alert.present();
}

}
