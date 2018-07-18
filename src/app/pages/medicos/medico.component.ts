import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico( '', '', null, null, '');
  hospital: Hospital = new Hospital ('', '', '');
  
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
    ) { 
      activatedRoute.params.subscribe ( params => {

      let id = params ['id'];

      console.log (id)

      if ( id !== 'nuevo') {
        this.cargarMedico (id);
      }
    })
  }

  ngOnInit() {

    this._hospitalService.cargarHospitales()
    .subscribe ( (resp: any) => {
      this.hospitales = resp.hospitales;
    });

    this._modalUploadService.notificacion
      .subscribe ( resp => {

        this.medico.img = resp.medico.img;

      });
  }

  cambioHospital( id: string ) {

    console.log (id);

    this._hospitalService.obtenerHospital ( id )
      .subscribe ( (resp: any) => {
        this.hospital = resp.hospital;
      });

  }

  
  cargarMedico (id: string) {

    this._medicoService.cargarMedico(id)
    .subscribe ( (medico: Medico) => {
      console.log (medico);
      
      this.medico = medico;
      this.medico.hospital = medico.hospital;
      this.cambioHospital (this.medico.hospital._id);

    });

  }

  guardarMedico(f: NgForm) {

    console.log ( f.valid );
    console.log ( f.value );

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico ( this.medico )
        .subscribe ( medico => {

          this.medico._id = medico._id;
          //this.navigate(['/medico', medico._id ]);
        });
    
  }

  cambiarFoto () {

    this._modalUploadService.mostrarModal('medicos', this.medico._id);

  }

}
