import { IngredientModel } from "../models/ingredients.model";

export class ShoppingListService {
  private ingredients: IngredientModel[] = [];

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
}
