import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { PredictionsService } from './services/predictions.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PredictionsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        { path: '', component: PredictionsComponent, pathMatch: 'full' },
    
    ])
  ],
    providers: [PredictionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
