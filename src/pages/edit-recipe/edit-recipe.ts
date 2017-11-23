import { Component, OnInit } from '@angular/core';
import { IonicPage,
          NavController,
          NavParams,
          ActionSheetController,
          AlertController,
          ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy','Medium','Hard'];
  recipeForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  private initializeForm(){
    this.recipeForm = new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'difficulty': new FormControl('Medium',Validators.required),
        'ingredientsArray': new FormArray([])
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
      title: 'Add Ingrediente',
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
