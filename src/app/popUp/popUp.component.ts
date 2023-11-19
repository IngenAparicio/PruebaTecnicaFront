import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HttpService } from '../service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';
import { dialogConfig } from '../interface/dialog-config';
import { Personas } from '../interface/Personas';


@Component({
    selector: 'app-popUp',
    templateUrl: './popUp.component.html',
    styleUrls: ['./popUp.component.scss']
  })

export class PopUpComponent {
  formFormulario: FormGroup;

  documentos: { value: string; }[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private combo: Personas,
    private dialogRef: MatDialogRef<PopUpComponent>,
    private service: HttpService,
    private dialog: MatDialog,
  ){}

  ngOnInit(){
    if(this.combo.id == 0){
      this.formFormulario = new FormGroup({
        nombres: new FormControl(''),
        apellidos: new FormControl(''),
        noIdentificacion: new FormControl(''),
        email: new FormControl(''),
        tipoIdentificacion: new FormControl('')
      });
    }
    else{
      this.formFormulario = new FormGroup({

        nombres: new FormControl(this.combo.nombres),
        apellidos: new FormControl(this.combo.apellidos),
        noIdentificacion: new FormControl(this.combo.noIdentificacion),
        email: new FormControl(this.combo.email),
        tipoIdentificacion: new FormControl(this.combo.tipoIdentificacion)
      });
    }

    this.documentos = [
      { value: "CC" },
      { value: "TI" },
      { value: "CE" },
      { value: "MP" },
    ];
  }

  crearFormulario(){
    const model = {
      controlador: 'Main',
      action: this.combo.id == 0 ? 'CrearPersona' : 'EditarPersona',
      parametros: {

        id: this.combo.id,
        nombres: this.formFormulario.value.nombres,
        apellidos: this.formFormulario.value.apellidos,
        noIdentificacion: this.formFormulario.value.noIdentificacion,
        email: this.formFormulario.value.email,
        tipoIdentificacion: this.formFormulario.value.tipoIdentificacion,
        fechaCreacion: new Date(),
        idCalculada: this.formFormulario.value.tipoIdentificacion + this.formFormulario.value.noIdentificacion,
        nombreCompleto: this.formFormulario.value.nombres + ' ' + this.formFormulario.value.apellidos,

      }
    }as any
    this.service.post(model).subscribe(
      data => {
        dialogConfig.data = {
          mensaje: 'Registro Guardado correctamente',
          titulo: 'Registro Guardado'
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        this.dialogRef.close();
      }
    )
  }

  cerrar(){
    this.dialogRef.close();
  }

}