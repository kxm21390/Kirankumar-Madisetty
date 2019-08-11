import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { ListViewComponent } from './results/list-view/list-view.component';
import { GridViewComponent } from './results/grid-view/grid-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    ListViewComponent,
    GridViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
