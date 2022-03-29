import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';

const routes: Routes = [
  { path: 'list-empleados', component: ListEmpleadosComponent },
  { path: 'create-empleados', component: CreateEmpleadoComponent },
  { path: 'edit-empleados/:id', component: CreateEmpleadoComponent },
  { path: '', redirectTo: 'list-empleados', pathMatch: 'full' },
  { path: '**', redirectTo: 'list-empleados', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
