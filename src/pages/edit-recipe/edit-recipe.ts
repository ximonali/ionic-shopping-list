import { Component, OnInit } from '@angular/core';
import { IonicPage,
          NavController,
          NavParams,
          ActionSheetController,
          AlertController,
          ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { RecipeModel } from '../../models/recipe.model';


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy','Medium','Hard'];
  recipeForm: FormGroup;
  recipe: RecipeModel;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private recipesService: RecipesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit(){
    //console.log(this.recipeForm);
    const value = this.recipeForm.value;
    let ingredient1 = [];
    if (value.ingredientsArray.length > 0){
      ingredient1 = value.ingredientsArray.map(name =>{
        return {name: name, amount: 1};
      });
    }
    if (this.mode == 'Edit') {
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredient1);
    }else{
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredient1);
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private initializeForm(){
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredientsArray = [];

    if (this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients){
        ingredientsArray.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
        'title': new FormControl(title, Validators.required),
        'description': new FormControl(description, Validators.required),
        'difficulty': new FormControl(difficulty,Validators.required),
        'ingredientsArray': new FormArray(ingredientsArray)
    });
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [{
        text: 'Add Ingredient',
        handler:() => {
          this.createNewIngredientAlert().present();
        }
      },
      { text: 'Remove all Ingredients',
        role: 'destructive',
        handler: () => {
          const fArray: FormArray = <FormArray>this.recipeForm.get('ingredientsArray')
          const len = fArray.length;
          if (len > 0){
            for (let i = len - 1; i>= 0; i--) {
              fArray.removeAt(i);
            }
            const toast = this.toastController.create({
              message: 'All Ingredients were deleted!',
              duration: 1500,
              position: 'bottom'
            });
            toast.present();
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert(){
    const newIngredienteAlert = this.alertController.create({
      title: 'Add Ingredient',
      inputs: [{
        name: 'name1',
        placeholder: 'Name'
      }],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name1.trim() == '' || data.name1 == null){
              const toast = this.toastController.create({
                message: 'Please enter a valid value!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredientsArray'))
            .push(new FormControl(data.name1, Validators.required));
            const toast = this.toastController.create({
              message: 'Ingredient Added!',
              duration: 1500,
              position: 'bottom'
            });
            toast.present();

          }
        }
      ]
    });
    return newIngredienteAlert;
  }

}
