import { IngredientModel } from "../models/ingredient.model";
import { Http,Response } from "@angular/http";
import { Injectable } from '@angular/core';
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
  private ingredients: IngredientModel[] = [];

  constructor(private http: Http, private authService: AuthService){}

  addItem(name: string, amount: number){
    this.ingredients.push(new IngredientModel(name,amount));
    console.log(this.ingredients);
  }

  addItems(items: IngredientModel[]){
    this.ingredients.push(...items); //spread operator
  }

  getItems(){
    return this.ingredients.slice();
  }

  removeItem(index: number){
    this.ingredients.splice(index,1);
  }

  storeList(token: string){
    const userId = this.authService.getActiveUser().uid;
     return this.http
    .put('https://ionic-shopping-list-d0d5a.firebaseio.com/' + userId + '/shopping-list.json?auth=' +token, this.ingredients)
    .map((response: Response) => {
      return response.json();
    });
  }

}
