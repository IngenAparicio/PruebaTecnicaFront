import { Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpService } from './service';
import { dialogConfig } from './interface/dialog-config';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PopUpComponent } from './popUp/popUp.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog.component';
import { Personas } from './interface/Personas';
import { PopUpUsuarioComponent } from './popUpUsuario/popUpUsuario.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from './interface/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formFormulario: FormGroup;
  title = 'prueba-tecnica';
  displayedColumns = ['Id', 'NombreCompleto', 'IdCalculada', 'Email', 'FechaCreacion', 'Accion'];
  displayedArray = [
    {nombreFila: "Id", titulo: "Id", valor:"id", tipoCelda: "Texto"},
    {nombreFila: "NombreCompleto", titulo: "Nombre Completo", valor:"nombreCompleto", tipoCelda: "Texto"},
    {nombreFila: "IdCalculada", titulo: "Identificación", valor:"idCalculada", tipoCelda: "Texto"},
    {nombreFila: "Email", titulo: "Email", valor:"email", tipoCelda: "Texto"},
    {nombreFila: "FechaCreacion", titulo: "FechaCreacion", valor:"fechaCreacion", tipoCelda: "Fecha"},
    {nombreFila: "Accion", titulo: "Accion", valor:"Accion", tipoCelda: "Accion"},
  ];
  dataSource = new MatTableDataSource<Personas>;

  @ViewChild('paginatorPersonas') paginatorPersonas: MatPaginator;
  @ViewChild('tablaPersonas', {read: MatSort, static: true}) sortPersonas: MatSort;

  personas: Personas[] = [];
  usuario: Usuario;
  bandera: boolean;

  constructor(
    private service: HttpService,
    private dialog: MatDialog,
    ){
      this.usuario = {
        id: 0,
        usuarioPlat: '',
        pass: '',
      } as Usuario;
    }

  ngOnInit(){
    this.formFormulario = new FormGroup({
      usuarioPlat: new FormControl(''),
      pass: new FormControl(''),      
    });
    this.datos();
    this.bandera = false;
  }


  ngAfterViewInit() {
    if (this.paginatorPersonas) {
      const rangoEnEspanol = (page: number, tamanoPagina: number, length: number) => {
        if (length == 0 || tamanoPagina == 0) { return `0 de ${length}`; }

        length = Math.max(length, 0);

        const indiceInicio = page * tamanoPagina;
        const endIndex = indiceInicio < length ?
          Math.min(indiceInicio + tamanoPagina, length) :
          indiceInicio + tamanoPagina;
        return `${indiceInicio + 1} - ${endIndex} de ${length}`;
      }
      this.paginatorPersonas._intl.itemsPerPageLabel = "Items Por Pagina: ";
      this.paginatorPersonas._intl.firstPageLabel = "Primera Pagina";
      this.paginatorPersonas._intl.lastPageLabel = "Última Pagina";
      this.paginatorPersonas._intl.nextPageLabel = "Siguiente";
      this.paginatorPersonas._intl.previousPageLabel = "Anterior";
      this.paginatorPersonas._intl.getRangeLabel = rangoEnEspanol;
    }

    if (this.dataSource) {
      this.dataSource.paginator = this.paginatorPersonas;     
      this.dataSource.sort = this.sortPersonas;
    }
    
  }
  
  datos(){
    const model = {
      controlador: 'Main',
      action: 'ListaConsultaPersonas',
      parametros: {}
    }as any
    this.service.post(model).subscribe(
      data => {
        this.personas = data as any;
        this.dataSource = new MatTableDataSource<Personas>(this.personas);   
        setTimeout(()=>{
          this.dataSource.paginator = this.paginatorPersonas;     
          this.dataSource.sort = this.sortPersonas;
        })
      }
    )    
  }

  Login(){
    const model = {
      controlador: 'Main',
      action: 'Login',
      parametros: {
        usuarioPlat: this.formFormulario.value.usuarioPlat,
        pass: this.formFormulario.value.pass,
      }
    }as any
    this.service.post(model).subscribe(
      data => {
        this.usuario = data as any
        if(this.usuario.id != 0){
          this.bandera = true;
        }
      }
    )    
  }

  LogOut(){
    this.bandera = false;
    this.formFormulario.reset();
  }

  editar(row?: any){
    dialogConfig.data = {
      id: row != undefined ? row.id : 0,
      nombres: row != undefined ? row.nombres : 0,
      apellidos: row != undefined ? row.apellidos : 0,
      noIdentificacion: row != undefined ? row.noIdentificacion : 0,
      email: row != undefined ? row.email : 0,
      tipoIdentificacion: row != undefined ? row.tipoIdentificacion : 0,
      fechaCreacion: row != undefined ? row.fechaCreacion : 0,
      idCalculada: row != undefined ? row.idCalculada : 0,
      nombreCompleto: row != undefined ? row.nombreCompleto : 0,
    }

    const dialogRef: MatDialogRef<PopUpComponent, string> = this.dialog.open(PopUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {this.datos();});

  }

  CrearUsuario(){
    dialogConfig.data = {
    }

    const dialogRef: MatDialogRef<PopUpUsuarioComponent, string> = this.dialog.open(PopUpUsuarioComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {this.datos();});

  }

  EliminarPersona(row: any){
    const model = {
      controlador: 'Main',
      action: 'EliminarPersona',
      parametros: {

        id: row.id

      }
    }as any
    this.service.post(model).subscribe(
      data => {
        dialogConfig.data = {
          mensaje: 'Registro Eliminado correctamente',
          titulo: 'Registro Eliminado'
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);        
        this.datos();
      }
    )
  }

}
