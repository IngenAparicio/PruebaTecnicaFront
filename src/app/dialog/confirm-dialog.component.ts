import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    titulo: string;
    mensaje: string;
    bandera: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
        this.titulo = 'Eliminar Registro';
        this.mensaje = 'Desea Eliminar este Registro ?';
        this.mensaje = this.data.mensaje != undefined ? this.data.mensaje : this.mensaje;
        this.titulo = this.data.titulo != undefined ? this.data.titulo : this.titulo;
        this.bandera = this.data.titulo.includes('Eliminar') ? true : false;
    }

    ngOnInit() {}

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }

}