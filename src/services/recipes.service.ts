import { RecipeModel } from "../models/recipe.model";
import { IngredientModel } from "../models/ingredient.model";

export class RecipesService {
  private recipes: RecipeModel[] = [];

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
               ingredients: IngredientModel[])
  {
    this.recipes[index] = new RecipeModel(title,description,difficulty,ingredients);

  }

  removeRecipe(index: number){
    this.recipes.splice(index,1);
  }

}
