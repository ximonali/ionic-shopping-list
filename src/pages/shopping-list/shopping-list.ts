import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { IngredientModel } from '../../models/ingredients.model';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listIngredients: IngredientModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService ) {
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

}
