import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestorage: AngularFirestore) {

  }
  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestorage.collection('empleados').add(empleado);
  }
  getEmpleados(): Observable<any> {
    return this.firestorage.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }
  eliminarEmpleado(id: string): Promise<any> {
    return this.firestorage.collection('empleados').doc(id).delete();
  }
  getEmpleadoById(id: string): Observable<any> {
    return this.firestorage.collection('empleados').doc(id).snapshotChanges();
  }
  actualizarEmpleado(id: string, data:any): Promise<any>{
    return this.firestorage.collection('empleados').doc(id).update(data);
  }
}
