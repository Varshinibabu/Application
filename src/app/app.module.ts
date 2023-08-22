import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
// import  {ConfirmationPopoverModule} from '.angular-confirmation-popover'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { AppcomponentComponent } from './appcomponent/appcomponent.component';
import {MatTableModule} from '@angular/material/table';
import { CrudComponent } from './crud/crud.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AppComponent,
    AppcomponentComponent,
    CrudComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatCommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
