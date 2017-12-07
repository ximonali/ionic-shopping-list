import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";


@Component({
  selector: `page-recipes-options`,
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3> Store & Load</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onAction('load')">Load Recipes List</button>
        </ion-col>
      </ion-row>
      <ion-row>
      <ion-col>
        <button ion-button outline (click)="onAction('store')">Save Recipes List</button>
      </ion-col>
    </ion-row>
    </ion-grid>
  `
})

export class RecipesOptions {
  constructor(private viewController: ViewController){}

  onAction(action: String){
    this.viewController.dismiss({action: action});
 }

}
