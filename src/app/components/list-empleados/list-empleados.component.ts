import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from './../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  constructor(private service: EmpleadoService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    this.service.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        //console.log(element.payload.doc.data())
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados)
    })
  }
  eliminarEmpleado(id: string){
    this.service.eliminarEmpleado(id).then(() => {
      this.toastr.error('Empleado eliminado con éxito!', 'Empleado Eliminado!', {positionClass: 'toast-bottom-right'});
    }).catch(error =>{
      console.log(error);
    })
  }
}
