import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from './../../services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null = '';
  titulo = 'Agregar Empleado';
  constructor(private fb: FormBuilder, private empleadoservice: EmpleadoService,
    private router: Router, private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.empleadoEditar()
  }

  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado() {
    this.titulo = 'Registrar Empleado';
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellidos: this.createEmpleado.value.apellidos,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this.empleadoservice.agregarEmpleado(empleado).then(() => {
      this.toastr.success('Empleado registrado con éxito!', 'Empleado Registrado!', { positionClass: 'toast-bottom-right' });
      this.loading = false;
      this.router.navigate(['/list-empleados'])
    }).catch(error => {
      console.log(error)
      this.loading = false
    })
  }
  /**
   * Edita el empleado proporcionando su id
   * @param id 
   */
  editarEmpleado(id: string) {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellidos: this.createEmpleado.value.apellidos,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.empleadoservice.actualizarEmpleado(id, empleado).then(() => {
      this.toastr.info('El empleado fue modificado con éxito', 'Empleado Modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados'])
    })
  }

  empleadoEditar() {   
    if (this.id != null) {
      this.empleadoservice.getEmpleadoById(this.id).subscribe(data => {
        this.titulo = 'Editar Empleado';
        //console.log(data.payload.data('nombre'));
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellidos: data.payload.data()['apellidos'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario']
        })
      })
    }
  }
}
