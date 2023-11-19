import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HttpService } from '../service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';
import { dialogConfig } from '../interface/dialog-config';
import { Usuario } from '../interface/Usuario';


@Component({
    selector: 'app-popUp',
    templateUrl: './popUpUsuario.component.html',
    styleUrls: ['./popUpusuario.component.scss']
  })

export class PopUpUsuarioComponent {
  formFormulario: FormGroup;

  documentos: { value: string; }[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private combo: Usuario,
    private dialogRef: MatDialogRef<PopUpUsuarioComponent>,
    private service: HttpService,
    private dialog: MatDialog,
  ){}

  ngOnInit(){    

    this.formFormulario = new FormGroup({
      usuarioPlat: new FormControl(''),
      pass: new FormControl(''),
      fechaCreacion: new FormControl(''),
    });
  }

  crearFormulario(){
    const model = {
      controlador: 'Main',
      action: 'CrearUsuario',
      parametros: {

        id: 0,
        usuarioPlat: this.formFormulario.value.usuarioPlat,
        pass: this.formFormulario.value.pass,
        fechaCreacion: this.formFormulario.value.fechaCreacion,

      }
    }as any
    this.service.post(model).subscribe(
      data => {
        dialogConfig.data = {
          mensaje: 'Registro Creado correctamente',
          titulo: 'Registro Creado'
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