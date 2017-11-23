import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeModel } from '../../models/recipe.model';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: RecipeModel;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddIngredients(){

  }

  onEditRecipe(){

  }

  onRemoveRecipe(){

  }

}
