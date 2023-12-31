import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { popUpModule } from './popUp/popUp.module';
import { HttpService } from './service';
import { MatSelectModule } from '@angular/material/select';
import { popUpUsuarioModule } from './popUpUsuario/popUpUsuario.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    popUpModule,
    popUpUsuarioModule,
    MatSelectModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [HttpService, MatDatepickerModule, {provide:MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
