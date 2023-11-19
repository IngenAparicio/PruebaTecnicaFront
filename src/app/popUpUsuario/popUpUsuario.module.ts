import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { PopUpUsuarioRoutingModule } from './popUpUsuario-routing.module';
import { PopUpUsuarioComponent } from './popUpUsuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    PopUpUsuarioComponent
  ],
  imports: [
    BrowserModule,
    PopUpUsuarioRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [MatDatepickerModule, {provide:MatDialogRef, useValue: {}}],
  bootstrap: [PopUpUsuarioComponent]
})
export class popUpUsuarioModule { }