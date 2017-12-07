import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'; 

import { MyApp } from './app.component';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { RecipePage } from '../pages/recipe/recipe';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipesPage } from '../pages/recipes/recipes';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipesService } from '../services/recipes.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';
import { ShoppingOptions } from '../pages/shopping-list/shopping-options/shopping-options';
import { RecipesOptions } from '../pages/recipes/recipes-options/recipes-options';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    ShoppingOptions,
    RecipesOptions
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    ShoppingOptions,
    RecipesOptions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
