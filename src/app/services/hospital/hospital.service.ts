import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class HospitalService {

  hospital: Hospital;

  constructor(public http: HttpClient) {}


  cargarHospitales () {

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);

  }

  obtenerHospital (id: string) {
  
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url);

  }

  
    borrarHospital (id: string) {

    let token = localStorage.getItem('token');

     let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + token;

    return this.http.delete ( url )
        .map ( resp => {
            swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
            return true;
        });

  }

  crearHospital ( nombre: string) {

    let token = localStorage.getItem('token');

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + token;

   return this.http.post ( url , { nombre   } )
          .map ( ( resp: any ) => {

            swal('Hospital creado', nombre, 'success');
            return resp.usuario;

          });

  }

  
  buscarHospital (termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
        .map( (resp: any) => resp.hospitales );

  }

  actualizarHospital ( hospital: Hospital ) {

    let token = localStorage.getItem('token');

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + token;
    
    return this.http.put ( url, hospital )
    .map ( (resp: any) => {

      swal('Hospital actualizado', hospital.nombre, 'success');


      return true;

    });

  }


}
