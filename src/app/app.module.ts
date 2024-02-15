import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { provideHttpClient } from '@angular/common/http';
import { DataComponent } from './data/data.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { MatListModule } from '@angular/material/list';
import { Globals } from './globals/global';
import { ClearBtnComponent } from './components/clear-btn/clear-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DataComponent,
    FilterMenuComponent,
    LoaderComponent,
    ClearBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  providers: [provideHttpClient(), provideAnimationsAsync(), Globals],
  bootstrap: [AppComponent],
})
export class AppModule {}
