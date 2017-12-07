import { RecipeModel } from "../models/recipe.model";
import { IngredientModel } from "../models/ingredient.model";
import { AuthService } from "./auth";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Injectable } from "@angular/core";

@Injectable()
export class RecipesService {
  private recipes: RecipeModel[] = [];

constructor(private authService: AuthService, private http: Http){}

  addRecipe(title: string,
            description: string,
            difficulty: string,
            ingredients: IngredientModel[]){

    this.recipes.push(new RecipeModel(title,description,difficulty,ingredients))
    console.log(this.recipes);
  }

  getRecipes(){
    return this.recipes.slice();
  }

  updateRecipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: IngredientModel[]){
    this.recipes[index] = new RecipeModel(title,description,difficulty,ingredients);
  }

  removeRecipe(index: number){
    this.recipes.splice(index,1);
  }

  storeRecipeList(token: string){
    const userId = this.authService.getActiveUser().uid;
     return this.http
    .put('https://ionic-shopping-list-d0d5a.firebaseio.com/' + userId + '/recipes.json?auth=' +token, this.recipes)
    .map((response: Response) => {
      return response.json();
    });
  }

  fetchRecipeList(token: string){
    const userId = this.authService.getActiveUser().uid;
     return this.http.get('https://ionic-shopping-list-d0d5a.firebaseio.com/' + userId + '/recipes.json?auth=' +token)
    .map((response: Response) => {
      console.log(response);
      const recipes: RecipeModel[] = response.json() ? response.json() : [];
      for(let item of recipes){
        if (!item.hasOwnProperty('ingredients')){
            item.ingredients = [];
        }
      }
      return recipes;
    })
    .do((recipes: RecipeModel[]) => {
      if (recipes) {
        this.recipes = recipes;
      }else {
        this.recipes = [];
      }
    });
  }

}
