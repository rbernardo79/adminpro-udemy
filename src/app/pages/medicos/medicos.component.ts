import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();

  }


  cargarMedicos () {

    this._medicoService.cargarMedicos()
    .subscribe ( (resp: any) => {

      this.totalRegistros =  resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;

    })

  }

  buscarMedico (termino: string) {

    if ( termino === '' ) {
      this.cargarMedicos();
    } else {
  
        this.cargando = true;
        this._medicoService.buscarMedico(termino)
          .subscribe ( (medicos: Medico[]) => {
      
            this.medicos = medicos;
            this.cargando = false;
      
          });
    }

  }

   borrarMedico ( medico: Medico ) {

    console.log (medico);

   
    swal({
      title: 'Está seguro',
      text: 'No podrá recuperar el medico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {
    
      if ( borrar ) {
        
        this._medicoService.borrarMedico(medico._id)
          .subscribe( resp => {
            this.cargarMedicos();
          });
        
      }
    });
  

  }

}
