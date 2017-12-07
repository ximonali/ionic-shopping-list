import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeModel } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';
import { RecipesOptions } from './recipes-options/recipes-options'
import { AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { AuthService } from '../../services/auth';


@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: RecipeModel[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private recipesService: RecipesService,
              private popoverController: PopoverController,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private authService: AuthService) {
  }

  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: RecipeModel, index: number){
    this.navCtrl.push(RecipePage,{ recipe: recipe, index: index});
  }

  onShowOptions(event: MouseEvent){
    const loading = this.loadingController.create({
      content: 'Please Wait...'
    });
    const popover = this.popoverController.create(RecipesOptions);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if(!data){
          return;
        }
      if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
        .then(
          (token: string) => {
            this.recipesService.fetchRecipeList(token)
            .subscribe(
              (list: RecipeModel[]) => {
                console.log('Success!');
                loading.dismiss();
                if (list){
                  this.recipes = list;
                }else{
                  this.recipes = [];
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
            this.recipesService.storeRecipeList(token)
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
