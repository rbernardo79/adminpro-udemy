import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


@Injectable()
export class MedicoService {

  medico: Medico;

  constructor(public http: HttpClient) {}
  
  
  cargarMedicos () {

    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url);

  }

  cargarMedico (id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .map( (resp: any) => resp.medico);

  }

  buscarMedico (termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
        .map( (resp: any) => resp.medicos );

  }

  borrarMedico (id: string) {

    let token = localStorage.getItem('token');

     let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + token;

    console.log (url);

    return this.http.delete ( url )
        .map ( resp => {
            swal('Medico borrado', 'El medico ha sido eliminado correctamente', 'success');
            return true;
        });

  }

  guardarMedico ( medico: Medico ) {

    let token = localStorage.getItem('token');

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // actualizar
      url += '/' + medico._id;
      url += '?token=' + token;


      return this.http.put (url,  medico )
        .map ( ( resp: any ) => {

          swal('Medico actualizado', medico.nombre, 'success');
          return resp.medico;

        });

    } else {
      // crear
      url += '?token=' + token;

      return this.http.post ( url , medico)
             .map ( ( resp: any ) => {
   
               swal('Medico creado', medico.nombre, 'success');
               return resp.medico;
   
             });
    }

  }

}
