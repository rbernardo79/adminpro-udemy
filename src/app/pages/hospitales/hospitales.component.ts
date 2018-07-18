import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

  }

  cargarHospitales () {

    this._hospitalService.cargarHospitales()
    .subscribe ( (resp: any) => {

      this.totalRegistros =  resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;

    });

  }

  buscarHospital (termino: string) {

      if ( termino === '' ) {
        this.cargarHospitales();
      } else {
    
          this.cargando = true;
          this._hospitalService.buscarHospital(termino)
            .subscribe ( (hospitales: Hospital[]) => {
        
              this.hospitales = hospitales;
              this.cargando = false;
        
            });
      }
  }
  
  borrarHospital( hospital: Hospital ) {

    if ( hospital._id === this._hospitalService.hospital._id ) {
      swal('No se puede borrar el hospital','No se puede borrar a si mismo', 'error');
      return;
    }
    
    swal({
      title: 'Está seguro',
      text: 'No podrá recuperar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {
    
      if ( borrar ) {
  
        this._hospitalService.borrarHospital(hospital._id)
          .subscribe( resp => {
            this.cargarHospitales();
          });
        
      }
    })
  


  }


  guardarHospital ( hospital: Hospital ) {

    this._hospitalService.actualizarHospital ( hospital )
    .subscribe();
    
  }

  crearHospital () {

    swal({
      title: 'Crear hospital',
      text: 'Indique el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then ( (valor: string) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital ( valor )
        .subscribe ( () => this.cargarHospitales() );

    });
    
}

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal ('hospitales',  id);
  }

  




}
